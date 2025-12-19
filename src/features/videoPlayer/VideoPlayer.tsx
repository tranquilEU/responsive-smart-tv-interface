import React, { useRef } from 'react';

import { useVideoPlayer } from '@/features/videoPlayer/useVideoPlayer';

export const VideoPlayer: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement | null>(null);

	useVideoPlayer(videoRef);

	return (
		<video
			ref={videoRef}
			className="fixed top-0 left-0 w-screen h-screen object-cover -z-10"
		/>
	);
};
