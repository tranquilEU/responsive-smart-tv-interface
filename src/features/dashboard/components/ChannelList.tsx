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

	return (
		<div className="md:col-span-2 gap-2 flex flex-col">
			{channels.map((ch, index) => (
				<Button
					key={ch.id}
					variant={selectedChannel === ch.id ? 'default' : 'ghost'}
					size={'lg'}
					className="w-full text-white h-10"
					ref={el => {
						itemRefs.current[index] = el;
						if (index === 0 && el) firstItemRef.current = el;
					}}
					tabIndex={index === focusIndex ? 0 : -1}
					onKeyDown={handleKeyDown}
					onClick={() => onSelectChannel(ch.id)}
				>
					<div className="flex items-center justify-start gap-2 w-full">
						<div className="w-10 h-10 flex items-center justify-center bg-white rounded">
							<img src={ch.icon} alt={ch.name} />
						</div>
						<span>{index + 1}</span>
						<span className="truncate">{ch.name}</span>
					</div>
				</Button>
			))}
		</div>
	);
};
