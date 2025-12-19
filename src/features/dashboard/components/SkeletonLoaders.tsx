import React from 'react';

import { Skeleton } from '@/shared/components/ui/skeleton';

export const ChannelRowSkeleton = () => (
	<div className="flex items-center space-x-3">
		<Skeleton className="h-10 w-10 rounded-full" />
		<Skeleton className="h-6 w-60 rounded-md" />
	</div>
);

export const DateRowSkeleton = () => (
	<Skeleton className="h-10 w-10 rounded-md" />
);

export const EPGRowSkeleton = () => (
	<div className="flex items-center space-x-3">
		<Skeleton className="h-10 w-24 rounded-md" />
		<Skeleton className="h-10 w-60 rounded-md" />
	</div>
);
