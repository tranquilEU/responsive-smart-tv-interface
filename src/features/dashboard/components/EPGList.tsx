import React from 'react';
import { AutoSizer, List } from 'react-virtualized';

import { Button } from '@/shared/components/ui/button';

import { useArrowNavigation } from '@/shared/hooks/useArrowNavigation';

import { formatTime } from '@/shared/helpers/formatTime';
import { useEPGStore } from '@/shared/store';
import { Programme } from '@/shared/types/types';

type Props = {
	programmes: Programme[];
	selectedProgramme: Programme | null;
	firstItemRef: React.MutableRefObject<HTMLElement | null>;
	onSelectedProgramme: (programme: Programme | null) => void;
	onPanelSwitch: (direction: 'left' | 'right') => void;
};

export const EPGList: React.FC<Props> = ({
	programmes,
	onPanelSwitch,
	firstItemRef,
	selectedProgramme,
	onSelectedProgramme
}) => {
	const setCurrentStream = useEPGStore(s => s.setCurrentStream);

	const items = programmes.map(p => ({ id: p.start + p.title }));
	const { focusIndex, handleKeyDown, itemRefs } = useArrowNavigation(
		items,
		() => {},
		onPanelSwitch
	);

	const now = Date.now();

	const rowRenderer = ({
		index,
		key,
		style
	}: {
		index: number;
		key: string;
		style: React.CSSProperties;
	}) => {
		const p = programmes[index];
		const start = new Date(p.start).getTime();
		const stop = new Date(p.stop).getTime();
		const isCurrentTime =
			!isNaN(start) && !isNaN(stop) && now >= start && now <= stop;
		const isSelectedProgramme =
			selectedProgramme?.title === p.title &&
			selectedProgramme?.start === p.start &&
			selectedProgramme?.stop === p.stop;

		return (
			<div key={key} style={style}>
				<Button
					ref={el => {
						itemRefs.current[index] = el;
						if (index === 0 && el) firstItemRef.current = el;
					}}
					tabIndex={index === focusIndex ? 0 : -1}
					onKeyDown={e => {
						handleKeyDown(e);
						if (e.key === 'Enter') {
							setCurrentStream(p.streamURL);
							onSelectedProgramme(p);
						}
					}}
					onClick={() => {
						setCurrentStream(p.streamURL);
						onSelectedProgramme(p);
					}}
					className={`flex flex-row items-center justify-start w-full h-14 bg-primary/50 relative 
						${isSelectedProgramme ? 'bg-primary/90 text-white' : 'bg-primary/50 text-[#a9a9a9]'}
						`}
				>
					{isCurrentTime && (
						<span className="absolute top-1 left-1 w-2 h-2 rounded-full bg-red-500" />
					)}
					<span>
						{formatTime(p.start)} - {formatTime(p.stop)}
					</span>
					<span>{p.title}</span>
				</Button>
			</div>
		);
	};

	return (
		<div className="p-2 h-full min-h-0">
			{programmes.length === 0 ? (
				<p className="text-white">{'No Information Available'}</p>
			) : (
				<AutoSizer>
					{({ height, width }) => (
						<List
							width={width}
							height={height}
							rowCount={programmes.length}
							rowHeight={56}
							rowRenderer={rowRenderer}
							className="overflow-y-auto scrollbar-hidden"
						/>
					)}
				</AutoSizer>
			)}
		</div>
	);
};
