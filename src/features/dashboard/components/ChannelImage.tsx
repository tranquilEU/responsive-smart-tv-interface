import React, { useState } from 'react';

import { Skeleton } from '@/shared/components/ui/skeleton';

type ChannelImageProps = {
	src: string;
	alt: string;
	size?: number;
};

export const ChannelImage: React.FC<ChannelImageProps> = ({
	src,
	alt,
	size = 40
}) => {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);

	return (
		<div
			className="relative flex items-center justify-center rounded-full overflow-hidden"
			style={{ width: size, height: size }}
		>
			{!loaded && !error && (
				<Skeleton className="absolute inset-0 rounded-full" />
			)}

			{!error && (
				<img
					src={src}
					alt={alt}
					width={size}
					height={size}
					loading="lazy"
					className={`object-contain w-full h-full transition-opacity duration-300 ${
						loaded ? 'opacity-100' : 'opacity-0'
					}`}
					onLoad={() => setLoaded(true)}
					onError={() => setError(true)}
				/>
			)}
		</div>
	);
};
