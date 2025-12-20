import React, { useEffect, useRef, useState } from 'react';

type AutoFillSkeletonProps = {
	itemHeight: number;
	RowSkeleton: React.FC;
};

export const AutoFillSkeleton: React.FC<AutoFillSkeletonProps> = ({
	itemHeight,
	RowSkeleton
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [count, setCount] = useState(0);

	useEffect(() => {
		const updateCount = () => {
			if (!containerRef.current) return;

			const height = containerRef.current.clientHeight;
			setCount(Math.ceil(height / itemHeight));
		};

		updateCount();

		const observer = new ResizeObserver(updateCount);
		if (containerRef.current) observer.observe(containerRef.current);

		return () => observer.disconnect();
	}, [itemHeight]);

	return (
		<div ref={containerRef} className="space-y-2 p-2 h-full min-h-0">
			{Array.from({ length: count }).map((_, i) => (
				<RowSkeleton key={i} />
			))}
		</div>
	);
};
