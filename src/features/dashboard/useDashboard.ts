import { useMemo, useRef, useState } from 'react';

import { useEPG } from '@/shared/hooks/useEPG';

import { useEPGStore } from '@/shared/store';
import { NormalizedChannel, Programme } from '@/shared/types/types';

export const useDashboardLogic = () => {
	const { isLoading } = useEPG();
	const channels = useEPGStore(s => s.channels);

	const availableDates = useMemo(
		() =>
			Array.from(
				new Set(
					channels.flatMap(ch => ch.programmes.map(p => p.start.slice(0, 10)))
				)
			).sort(),
		[channels]
	);

	const [selectedChannel, setSelectedChannel] = useState<string>(
		channels[0]?.id ?? ''
	);
	const [selectedDate, setSelectedDate] = useState<string>(
		availableDates[0] ?? ''
	);
	const [selectedProgramme, setSelectedProgramme] = useState<Programme | null>(
		null
	);

	const selectedChannelData: NormalizedChannel | undefined = useMemo(
		() => channels.find(c => c.id === selectedChannel),
		[channels, selectedChannel]
	);

	const programmes: Programme[] =
		selectedChannelData?.programmes.filter(
			p => p.start.slice(0, 10) === selectedDate
		) ?? [];

	const [activePanel, setActivePanel] = useState<'channels' | 'dates' | 'epg'>(
		'channels'
	);

	const channelsFirstRef = useRef<HTMLElement | null>(null);
	const datesFirstRef = useRef<HTMLElement | null>(null);
	const epgFirstRef = useRef<HTMLElement | null>(null);

	const focusPanel = (panel: 'channels' | 'dates' | 'epg') => {
		setActivePanel(panel);
		if (panel === 'channels') channelsFirstRef.current?.focus();
		else if (panel === 'dates') datesFirstRef.current?.focus();
		else epgFirstRef.current?.focus();
	};

	const handlePanelSwitch = (direction: 'left' | 'right') => {
		if (activePanel === 'channels' && direction === 'right')
			focusPanel('dates');
		else if (activePanel === 'dates' && direction === 'left')
			focusPanel('channels');
		else if (activePanel === 'dates' && direction === 'right')
			focusPanel('epg');
		else if (activePanel === 'epg' && direction === 'left') focusPanel('dates');
	};

	return {
		channels,
		availableDates,
		selectedDate,
		setSelectedDate,
		selectedChannel,
		setSelectedChannel,
		selectedProgramme,
		setSelectedProgramme,
		isLoading,
		programmes,
		activePanel,
		focusPanel,
		handlePanelSwitch,
		channelsFirstRef,
		datesFirstRef,
		epgFirstRef
	};
};
