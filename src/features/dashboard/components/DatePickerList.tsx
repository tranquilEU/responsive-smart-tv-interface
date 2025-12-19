import React from 'react';
import { AutoSizer, List } from 'react-virtualized';

import { Button } from '@/shared/components/ui/button';

import { useArrowNavigation } from '@/shared/hooks/useArrowNavigation';

type Props = {
	dates: string[];
	selectedDate: string;
	onSelectDate: (date: string) => void;
	onPanelSwitch: (direction: 'left' | 'right') => void;
	firstItemRef: React.MutableRefObject<HTMLElement | null>;
};

const formatDate = (dateStr: string) => {
	const date = new Date(dateStr);
	return date.getDate().toString();
};

export const DatePickerList: React.FC<Props> = ({
	dates,
	selectedDate,
	onSelectDate,
	onPanelSwitch,
	firstItemRef
}) => {
	const items = dates.map(d => ({ id: d }));
	const { focusIndex, handleKeyDown, itemRefs } = useArrowNavigation(
		items,
		onSelectDate,
		onPanelSwitch
	);

	const uniqueDates = Array.from(new Set(dates)).sort();
	const todayStr = new Date().toISOString().slice(0, 10);

	// Row renderer for react-virtualized
	const rowRenderer = ({
		index,
		key,
		style
	}: {
		index: number;
		key: string;
		style: React.CSSProperties;
	}) => {
		const date = uniqueDates[index];
		const isSelected = selectedDate === date;
		const isToday = todayStr === date;

		return (
			<div key={key} style={style}>
				<Button
					variant={isSelected ? 'default' : 'ghost'}
					className="flex items-center relative w-10 h-10 bg-transparent focus:bg-transparent"
					ref={el => {
						itemRefs.current[index] = el;
						if (index === 0 && el) firstItemRef.current = el;
					}}
					tabIndex={index === focusIndex ? 0 : -1}
					onKeyDown={handleKeyDown}
					onClick={() => onSelectDate(date)}
				>
					{isToday && (
						<span className="absolute top-1 left-1 w-2 h-2 rounded-full bg-red-500" />
					)}
					<span>{formatDate(date)}</span>
				</Button>
			</div>
		);
	};

	return (
		<div className="md:col-span-1 p-2 h-full">
			<AutoSizer>
				{({ height, width }) => (
					<List
						width={width}
						height={height}
						rowCount={uniqueDates.length}
						rowHeight={56}
						rowRenderer={rowRenderer}
						className="overflow-y-auto scrollbar-hidden"
					/>
				)}
			</AutoSizer>
		</div>
	);
};
