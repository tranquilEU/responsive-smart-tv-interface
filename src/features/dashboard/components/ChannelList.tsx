import React from 'react';
import { AutoSizer, List } from 'react-virtualized';

import { ChannelImage } from '@/features/dashboard/components/ChannelImage';

import { Button } from '@/shared/components/ui/button';

import { useArrowNavigation } from '@/shared/hooks/useArrowNavigation';

import { useEPGStore } from '@/shared/store';
import { Channel } from '@/shared/types/types';

type Props = {
	channels: Channel[];
	selectedChannel: string;
	firstItemRef: React.MutableRefObject<HTMLElement | null>;
	onSelectChannel: (id: string) => void;
	onPanelSwitch: (direction: 'left' | 'right') => void;
};

export const ChannelList: React.FC<Props> = ({
	channels,
	selectedChannel,
	onSelectChannel,
	onPanelSwitch,
	firstItemRef
}) => {
	const setCurrentStream = useEPGStore(s => s.setCurrentStream);

	const { focusIndex, handleKeyDown, itemRefs } = useArrowNavigation(
		channels,
		onSelectChannel,
		onPanelSwitch
	);

	const rowRenderer = ({
		index,
		key,
		style
	}: {
		index: number;
		key: string;
		style: React.CSSProperties;
	}) => {
		const ch = channels[index];
		return (
			<div key={key} style={style} className="flex">
				<Button
					variant={selectedChannel === ch.id ? 'default' : 'ghost'}
					size="lg"
					className="items-center w-full h-14"
					ref={el => {
						itemRefs.current[index] = el;
						if (index === 0 && el) firstItemRef.current = el;
					}}
					tabIndex={index === focusIndex ? 0 : -1}
					onKeyDown={e => {
						handleKeyDown(e);
						if (e.key === 'Enter') {
							setCurrentStream(ch.streamURL);
						}
					}}
					onClick={() => {
						onSelectChannel(ch.id);
						setCurrentStream(ch.streamURL);
					}}
				>
					<div className="flex items-center justify-start gap-2 w-full">
						<div className="w-10 h-10 flex items-center justify-center rounded">
							<ChannelImage src={ch.icon} alt={ch.name} />
						</div>
						<span>{index + 1}</span>
						<span className="truncate text-sm sm:text-base">{ch.name}</span>
					</div>
				</Button>
			</div>
		);
	};

	return (
		<div className="p-2 h-full min-h-0">
			<AutoSizer>
				{({ height, width }) => (
					<List
						width={width}
						height={height}
						rowCount={channels.length}
						rowHeight={56}
						rowRenderer={rowRenderer}
						className="overflow-y-auto scrollbar-hidden"
					/>
				)}
			</AutoSizer>
		</div>
	);
};
