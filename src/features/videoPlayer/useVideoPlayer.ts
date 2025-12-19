import { RefObject, useEffect } from 'react';
import shaka from 'shaka-player';

import { DRM_LICENSE_SERVER } from '@/shared/constants';

import { useEPGStore } from '@/shared/store';

export function useVideoPlayer(videoRef: RefObject<HTMLVideoElement | null>) {
	const currentStream = useEPGStore(s => s.currentStream);

	useEffect(() => {
		if (!videoRef.current) return;

		shaka.polyfill.installAll();

		if (!shaka.Player.isBrowserSupported()) {
			console.error('Browser not supported');
			return;
		}

		const video = videoRef.current;
		const player = new shaka.Player(video);

		player.configure({
			drm: {
				servers: {
					'com.widevine.alpha': DRM_LICENSE_SERVER
				}
			}
		});

		video.muted = true;
		video.loop = true;
		video.playsInline = true;

		player
			.load(currentStream)
			.then(() => video.play().catch(() => {}))
			.catch(err => console.error('Load error:', err));

		return () => {
			player.destroy().catch(() => {});
		};
	}, [videoRef, currentStream]);
}
