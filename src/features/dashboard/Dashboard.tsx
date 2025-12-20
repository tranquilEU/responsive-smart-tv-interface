import React from 'react';

import { ChannelList } from '@/features/dashboard/components/ChannelList';
import { DatePickerList } from '@/features/dashboard/components/DatePickerList';
import { EPGList } from '@/features/dashboard/components/EPGList';
import {
	ChannelRowSkeleton,
	DateRowSkeleton,
	EPGRowSkeleton
} from '@/features/dashboard/components/SkeletonLoaders';
import { useDashboardLogic } from '@/features/dashboard/useDashboard';

import { AutoFillSkeleton } from '@/shared/components/AutoFillSkeleton';

export const Dashboard: React.FC = () => {
	const {
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
		handlePanelSwitch,
		channelsFirstRef,
		datesFirstRef,
		epgFirstRef
	} = useDashboardLogic();

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 p-4 h-screen overflow-hidden">
			<div className="col-span-1 lg:col-span-2 h-full min-h-0">
				{isLoading ? (
					<AutoFillSkeleton itemHeight={48} RowSkeleton={ChannelRowSkeleton} />
				) : (
					<ChannelList
						channels={channels}
						selectedChannel={selectedChannel}
						onSelectChannel={setSelectedChannel}
						onPanelSwitch={handlePanelSwitch}
						firstItemRef={channelsFirstRef}
					/>
				)}
			</div>
			<div className="col-span-1 lg:col-span-1 h-full min-h-0">
				{isLoading ? (
					<AutoFillSkeleton itemHeight={48} RowSkeleton={DateRowSkeleton} />
				) : (
					<DatePickerList
						dates={availableDates}
						selectedDate={selectedDate}
						onSelectDate={setSelectedDate}
						onPanelSwitch={handlePanelSwitch}
						firstItemRef={datesFirstRef}
					/>
				)}
			</div>
			<div className="col-span-1 sm:col-span-2 lg:col-span-3 h-full min-h-0">
				{isLoading ? (
					<AutoFillSkeleton itemHeight={48} RowSkeleton={EPGRowSkeleton} />
				) : (
					<EPGList
						programmes={programmes}
						selectedProgramme={selectedProgramme}
						onSelectedProgramme={setSelectedProgramme}
						onPanelSwitch={handlePanelSwitch}
						firstItemRef={epgFirstRef}
					/>
				)}
			</div>
		</div>
	);
};
