import { useEffect, useState } from 'react';

type AutoFillSkeletonProps = {
	itemHeight: number;
	RowSkeleton: React.FC;
};

export const AutoFillSkeleton: React.FC<AutoFillSkeletonProps> = ({
	itemHeight,
	RowSkeleton
}) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		const updateCount = () => {
			const vh = window.innerHeight;
			setCount(Math.ceil(vh / itemHeight));
		};

		updateCount();
		window.addEventListener('resize', updateCount);
		return () => window.removeEventListener('resize', updateCount);
	}, [itemHeight]);

	return (
		<div className="space-y-2 p-2">
			{Array.from({ length: count }).map((_, i) => (
				<RowSkeleton key={i} />
			))}
		</div>
	);
};
