import { AutoSizer, List } from 'react-virtualized';

import { ChannelImage } from '@/features/dashboard/components/ChannelImage';

import { Button } from '@/shared/components/ui/button';

import { useArrowNavigation } from '@/shared/hooks/useArrowNavigation';

import { Channel } from '@/shared/types/types';

type Props = {
	channels: Channel[];
	selectedChannel: string;
	onSelectChannel: (id: string) => void;
	onPanelSwitch: (direction: 'left' | 'right') => void;
	firstItemRef: React.MutableRefObject<HTMLElement | null>;
};

export const ChannelList: React.FC<Props> = ({
	channels,
	selectedChannel,
	onSelectChannel,
	onPanelSwitch,
	firstItemRef
}) => {
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
					className="items-center w-full h-10 bg-transparent focus:bg-transparent"
					ref={el => {
						itemRefs.current[index] = el;
						if (index === 0 && el) firstItemRef.current = el;
					}}
					tabIndex={index === focusIndex ? 0 : -1}
					onKeyDown={handleKeyDown}
					onClick={() => onSelectChannel(ch.id)}
				>
					<div className="flex items-center justify-start gap-2 w-full">
						<div className="w-10 h-10 flex items-center justify-center rounded">
							<ChannelImage
								src={ch.icon}
								alt={ch.name}
								fallback={
									<span className="text-sm font-bold">{ch.name[0]}</span>
								}
							/>
						</div>
						<span>{index + 1}</span>
						<span className="truncate">{ch.name}</span>
					</div>
				</Button>
			</div>
		);
	};

	return (
		<div className="md:col-span-2 p-2 h-full">
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
