export const formatDate = (dateStr: string): string => {
	// dateStr is "YYYY-MM-DD"
	const day = dateStr.slice(8, 10); // "01".."31"
	return String(parseInt(day, 10)); // remove leading zero
};
