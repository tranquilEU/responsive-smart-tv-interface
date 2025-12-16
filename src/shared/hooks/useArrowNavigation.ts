import { useCallback, useRef, useState } from 'react';

export const useArrowNavigation = <T extends { id: string }>(
	items: T[],
	onSelect: (id: string) => void,
	onPanelSwitch?: (direction: 'left' | 'right') => void
) => {
	const itemRefs = useRef<(HTMLElement | null)[]>([]);
	const [focusIndex, setFocusIndex] = useState(0);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			const key = e.key;
			if (key === 'ArrowDown' || key === 'Down') {
				e.preventDefault();
				e.stopPropagation();
				const next = Math.min(focusIndex + 1, items.length - 1);
				setFocusIndex(next);
				itemRefs.current[next]?.focus();
			} else if (key === 'ArrowUp' || key === 'Up') {
				e.preventDefault();
				e.stopPropagation();
				const prev = Math.max(focusIndex - 1, 0);
				setFocusIndex(prev);
				itemRefs.current[prev]?.focus();
			} else if (key === 'Enter' || key === ' ') {
				e.preventDefault();
				e.stopPropagation();
				onSelect(items[focusIndex].id);
			} else if (key === 'ArrowLeft' || key === 'Left') {
				if (onPanelSwitch) {
					e.preventDefault();
					e.stopPropagation();
					onPanelSwitch('left');
				}
			} else if (key === 'ArrowRight' || key === 'Right') {
				if (onPanelSwitch) {
					e.preventDefault();
					e.stopPropagation();
					onPanelSwitch('right');
				}
			}
		},
		[focusIndex, items, onSelect, onPanelSwitch]
	);

	return { focusIndex, setFocusIndex, handleKeyDown, itemRefs };
};
