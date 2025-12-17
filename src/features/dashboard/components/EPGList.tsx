import { useTranslation } from 'react-i18next';

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

	return (
		<div className="md:col-span-3 gap-2 p-2 flex flex-col">
			{programmes.length === 0 ? (
				<p className="text-white">{t('epgList.noInformationAvailable')}</p>
			) : (
				programmes.map((p, index) => {
					const start = new Date(p.start).getTime();
					const stop = new Date(p.stop).getTime();
					const isCurrent =
						!isNaN(start) && !isNaN(stop) && now >= start && now <= stop;

					return (
						<Button
							key={p.title + p.start}
							ref={el => {
								itemRefs.current[index] = el;
								if (index === 0 && el) firstItemRef.current = el;
							}}
							tabIndex={index === focusIndex ? 0 : -1}
							onKeyDown={handleKeyDown}
							className="p-2 flex flex-row items-center justify-start gap-4 w-full h-10 cursor-pointer bg-transparent focus:bg-transparent relative"
						>
							{isCurrent && (
								<span className="absolute top-1 left-1 w-2 h-2 rounded-full bg-red-500" />
							)}
							<span
								className={`${index === focusIndex ? 'text-white' : 'text-[#a9a9a9]'}`}
							>
								{formatTime(p.start)} - {formatTime(p.stop)}
							</span>
							<span
								className={`${index === focusIndex ? 'text-white' : 'text-[#a9a9a9]'}`}
							>
								{p.title}
							</span>
						</Button>
					);
				})
			)}
		</div>
	);
};
