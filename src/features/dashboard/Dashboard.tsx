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
		isLoading,
		programmes,
		handlePanelSwitch,
		channelsFirstRef,
		datesFirstRef,
		epgFirstRef
	} = useDashboardLogic();

	return (
		<div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 h-screen overflow-hidden">
			<div className="md:col-span-2">
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
			<div className="md:col-span-1">
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
			<div className="md:col-span-3">
				{isLoading ? (
					<AutoFillSkeleton itemHeight={48} RowSkeleton={EPGRowSkeleton} />
				) : (
					<EPGList
						programmes={programmes}
						onPanelSwitch={handlePanelSwitch}
						firstItemRef={epgFirstRef}
					/>
				)}
			</div>
		</div>
	);
};
