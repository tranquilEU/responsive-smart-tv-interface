import { useTranslation } from 'react-i18next';
import { AutoSizer, List } from 'react-virtualized';

import { Button } from '@/shared/components/ui/button';

import { useArrowNavigation } from '@/shared/hooks/useArrowNavigation';

import { formatTime } from '@/shared/helpers/formatTime';
import { Programme } from '@/shared/types/types';

type Props = {
	programmes: Programme[];
	onPanelSwitch: (direction: 'left' | 'right') => void;
	firstItemRef: React.MutableRefObject<HTMLElement | null>;
};

export const EPGList: React.FC<Props> = ({
	programmes,
	onPanelSwitch,
	firstItemRef
}) => {
	const { t } = useTranslation('translation');

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
		const isCurrent =
			!isNaN(start) && !isNaN(stop) && now >= start && now <= stop;

		return (
			<div key={key} style={style}>
				<Button
					ref={el => {
						itemRefs.current[index] = el;
						if (index === 0 && el) firstItemRef.current = el;
					}}
					tabIndex={index === focusIndex ? 0 : -1}
					onKeyDown={handleKeyDown}
					className="flex flex-row items-center justify-start w-full h-10 bg-transparent focus:bg-transparent relative"
				>
					{isCurrent && (
						<span className="absolute top-1 left-1 w-2 h-2 rounded-full bg-red-500" />
					)}
					<span
						className={`${
							index === focusIndex ? 'text-white' : 'text-[#a9a9a9]'
						}`}
					>
						{formatTime(p.start)} - {formatTime(p.stop)}
					</span>
					<span
						className={`${
							index === focusIndex ? 'text-white' : 'text-[#a9a9a9]'
						}`}
					>
						{p.title}
					</span>
				</Button>
			</div>
		);
	};

	return (
		<div className="md:col-span-3 p-2 h-full">
			{programmes.length === 0 ? (
				<p className="text-white">{t('epgList.noInformationAvailable')}</p>
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
