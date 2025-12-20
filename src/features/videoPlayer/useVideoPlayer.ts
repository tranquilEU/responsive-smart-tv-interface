import { RefObject, useEffect, useRef } from 'react';
import shaka from 'shaka-player';

import { DEFAULT_STREAM_URL, DRM_LICENSE_SERVER } from '@/shared/constants';

import { useEPGStore } from '@/shared/store';

export function useVideoPlayer(videoRef: RefObject<HTMLVideoElement | null>) {
	const currentStream = useEPGStore(s => s.currentStream);

	const lastTimeRef = useRef<number>(0);
	const stallCheckInterval = useRef<NodeJS.Timeout | null>(null);
	const stallCountRef = useRef<number>(0);

	useEffect(() => {
		if (!videoRef.current) return;

		shaka.polyfill.installAll();

		if (!shaka.Player.isBrowserSupported()) {
			console.error('Browser not supported');
			return;
		}

		const video = videoRef.current;
		let player = new shaka.Player(video);

		// --- CONFIGURE DRM ---
		const configureDRM = (p: shaka.Player) => {
			p.configure({
				drm: {
					servers: {
						'com.widevine.alpha': DRM_LICENSE_SERVER || ''
					}
				}
			});
		};

		configureDRM(player);

		video.muted = true;
		video.loop = false;
		video.playsInline = true;

		// --- SAFE LOAD FUNCTION (handles DRM + reset) ---
		const loadStream = async (url: string) => {
			if (!url) {
				console.error('Stream URL is empty — cannot load');
				return;
			}

			try {
				// Full reset is required after multiple failures
				await player.destroy();

				player = new shaka.Player(video);
				configureDRM(player);

				await player.load(url);
				await video.play().catch(() => {});

				stallCountRef.current = 0;
				console.log('Loaded stream:', url);
			} catch (err) {
				console.error('Failed to load stream:', url, err);
			}
		};

		// --- ERROR HANDLER ---
		player.addEventListener('error', async event => {
			const shakaError = (event as any).detail as shaka.util.Error;
			console.warn('Shaka error:', shakaError);

			await loadStream(currentStream || DEFAULT_STREAM_URL || '');
		});

		// --- STALL DETECTION ---
		const checkForStall = () => {
			if (!video) return;

			const currentTime = video.currentTime;

			if (currentTime === lastTimeRef.current) {
				stallCountRef.current += 1;
				console.warn(
					`Playback stalled — recovery attempt ${stallCountRef.current}/3`
				);

				// After 3 failures → fallback stream
				if (stallCountRef.current >= 3) {
					console.error('Too many stalls — switching to DEFAULT_STREAM_URL');
					loadStream(DEFAULT_STREAM_URL || '');
					return;
				}

				// Normal recovery
				loadStream(currentStream || DEFAULT_STREAM_URL || '');
			} else {
				// Playback is progressing normally
				stallCountRef.current = 0;
			}

			lastTimeRef.current = currentTime;
		};

		stallCheckInterval.current = setInterval(checkForStall, 3000);

		// --- INITIAL LOAD ---
		loadStream(currentStream || DEFAULT_STREAM_URL || '');

		// --- CLEANUP ---
		return () => {
			if (stallCheckInterval.current) {
				clearInterval(stallCheckInterval.current);
			}
			player.destroy().catch(() => {});
		};
	}, [videoRef, currentStream]);
}
