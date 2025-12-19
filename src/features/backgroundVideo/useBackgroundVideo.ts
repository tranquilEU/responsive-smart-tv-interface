import { useEffect } from 'react';
import shaka from 'shaka-player';

interface UseBackgroundVideoOptions {
	videoRef: React.RefObject<HTMLVideoElement | null>;
	streamUrl: string;
	licenseServer: string;
}

export const useBackgroundVideo = ({
	videoRef,
	streamUrl,
	licenseServer
}: UseBackgroundVideoOptions) => {
	useEffect(() => {
		shaka.polyfill.installAll();

		if (!shaka.Player.isBrowserSupported()) {
			console.error('Browser not supported');
			return;
		}

		const video = videoRef.current;
		if (!video) return;

		const player = new shaka.Player(video);

		player.configure({
			drm: {
				servers: {
					'com.widevine.alpha': licenseServer
				}
			}
		});

		video.muted = true;
		video.loop = true;
		video.playsInline = true;

		player
			.load(streamUrl)
			.then(() => video.play().catch(() => {}))
			.catch(err => console.error('Load error:', err));

		return () => {
			player.destroy().catch(() => {});
		};
	}, [videoRef, streamUrl, licenseServer]);
};
