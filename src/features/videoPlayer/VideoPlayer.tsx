import React, { useRef } from 'react';

import { useVideoPlayer } from '@/features/videoPlayer/useVideoPlayer';

export const VideoPlayer: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement | null>(null);

	useVideoPlayer(videoRef);

	return (
		<video
			ref={videoRef}
			className="
                fixed inset-0
                w-full h-full
                object-cover object-center
                -z-10
            "
			playsInline
			muted
			autoPlay
			loop
		/>
	);
};
