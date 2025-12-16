// Turn "+0100" into "+01:00" for ISO
export const formatOffset = (raw?: string) => {
	if (!raw) return ''; // no offset provided -> local time
	const m = raw.match(/^([+-])(\d{2})(\d{2})$/);
	if (!m) return ''; // fallback: local
	const [, sign, hh, mm] = m;
	return `${sign}${hh}:${mm}`;
};
