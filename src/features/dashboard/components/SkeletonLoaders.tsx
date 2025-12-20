import React from 'react';

import { Skeleton } from '@/shared/components/ui/skeleton';

export const ChannelRowSkeleton = () => (
	<div className="flex items-center space-x-3 w-full">
		<Skeleton className="h-10 w-10 rounded-full" />
		<Skeleton className="h-6 flex-1 max-w-50 sm:max-w-65 rounded-md" />
	</div>
);

export const DateRowSkeleton = () => (
	<div className="flex items-center">
		<Skeleton className="h-10 w-10 rounded-md" />
	</div>
);

export const EPGRowSkeleton = () => (
	<div className="flex items-center space-x-3 w-full">
		<Skeleton className="h-10 w-20 sm:w-24 rounded-md" />
		<Skeleton className="h-10 flex-1 max-w-65 sm:max-w-[320px] rounded-md" />
	</div>
);
