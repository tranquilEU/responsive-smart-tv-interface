export const formatTime = (dateStr: string) => {
	const d = new Date(dateStr);
	if (isNaN(d.getTime())) return dateStr; // fallback if invalid
	return d.toLocaleTimeString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	});
};
