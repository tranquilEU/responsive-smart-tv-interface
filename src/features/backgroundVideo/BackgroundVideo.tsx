import React, { useRef } from 'react';

import { useBackgroundVideo } from '@/features/backgroundVideo/useBackgroundVideo';

export const BackgroundVideo: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement | null>(null);

	useBackgroundVideo(videoRef);

	return (
		<video
			ref={videoRef}
			className="fixed top-0 left-0 w-screen h-screen object-cover -z-10"
		/>
	);
};
