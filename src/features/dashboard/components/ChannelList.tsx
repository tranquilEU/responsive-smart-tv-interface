import { Fragment } from 'react/jsx-runtime';

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
		<div className="md:col-span-2 p-2 gap-2 flex flex-col">
			{channels.map((ch, index) => {
				const isActive = ch.id === selectedChannel;
				return (
					<div className="flex" key={ch.id}>
						<Button
							variant={selectedChannel === ch.id ? 'default' : 'ghost'}
							size={'lg'}
							className={
								'p-2 cursor-pointer w-full h-10 bg-transparent focus:bg-transparent'
							}
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
									<img
										src={ch.icon}
										alt={ch.name}
										className="w-full h-full object-contain"
									/>
								</div>
								<span>{index + 1}</span>
								<span className="truncate">{ch.name}</span>
							</div>
						</Button>
					</div>
				);
			})}
		</div>
	);
};
