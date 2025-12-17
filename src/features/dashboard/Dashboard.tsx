import { ChannelList } from '@/features/dashboard/components/ChannelList';
import { DatePickerList } from '@/features/dashboard/components/DatePickerList';
import { EPGList } from '@/features/dashboard/components/EPGList';
import { useDashboardLogic } from '@/features/dashboard/useDashboard';

export const Dashboard: React.FC = () => {
	const {
		channels,
		availableDates,
		selectedDate,
		setSelectedDate,
		selectedChannel,
		setSelectedChannel,
		programmes,
		handlePanelSwitch,
		channelsFirstRef,
		datesFirstRef,
		epgFirstRef
	} = useDashboardLogic();

	return (
		<div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 bg-primary/75 h-screen overflow-hidden">
			<div className="md:col-span-2 overflow-y-auto scrollbar-hidden">
				<ChannelList
					channels={channels}
					selectedChannel={selectedChannel}
					onSelectChannel={setSelectedChannel}
					onPanelSwitch={handlePanelSwitch}
					firstItemRef={channelsFirstRef}
				/>
			</div>
			<div className="md:col-span-1 overflow-y-auto scrollbar-hidden">
				<DatePickerList
					dates={availableDates}
					selectedDate={selectedDate}
					onSelectDate={setSelectedDate}
					onPanelSwitch={handlePanelSwitch}
					firstItemRef={datesFirstRef}
				/>
			</div>
			<div className="md:col-span-3 overflow-y-auto scrollbar-hidden">
				<EPGList
					programmes={programmes}
					onPanelSwitch={handlePanelSwitch}
					firstItemRef={epgFirstRef}
				/>
			</div>
		</div>
	);
};
