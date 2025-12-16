import { formatOffset } from '@/shared/helpers/formatOffset';

export function normalizeProgrammeTime(raw: string): string {
	// XMLTV: "YYYYMMDDHHMMSS +ZZZZ" (offset optional)
	const xmltv = raw.match(
		/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})\s*([+-]\d{4})?$/
	);
	if (xmltv) {
		const [, y, m, d, hh, mm, ss, off] = xmltv;
		const offset = formatOffset(off); // include offset if present; otherwise local time without "Z"
		return offset
			? `${y}-${m}-${d}T${hh}:${mm}:${ss}${offset}`
			: `${y}-${m}-${d}T${hh}:${mm}:${ss}`;
	} // "YYYY-MM-DD HH:mm" -> keep local time (no Z)
	if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(raw)) {
		return raw.replace(' ', 'T') + ':00';
	} // Already ISO or unknown format -> return as-is
	return raw;
}
