import React, { useRef } from 'react';

import { useBackgroundVideo } from '@/features/backgroundVideo/useBackgroundVideo';

import { DRM_LICENSE_SERVER, STREAM_URL } from '@/shared/constants';

export const BackgroundVideo: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement | null>(null);

	useBackgroundVideo({
		videoRef,
		streamUrl: STREAM_URL,
		licenseServer: DRM_LICENSE_SERVER
	});

	return (
		<video
			ref={videoRef}
			className="fixed top-0 left-0 w-screen h-screen object-cover -z-10"
		/>
	);
};
