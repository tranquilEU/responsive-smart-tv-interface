import { useQuery } from '@tanstack/react-query';

import { EPG_URL, PROXY_SERVER_URL } from '@/shared/constants';

import { mapProgrammesToChannels } from '@/shared/utils/mapProgrammesToChannels';
import { xmlToJson } from '@/shared/utils/xmlToJson';

import { useEPGStore } from '@/shared/store';

const fetchEPG = async (): Promise<any> => {
	const response = await fetch(
		`${PROXY_SERVER_URL}/proxy?url=${encodeURIComponent(EPG_URL)}`
	);
	const text = await response.text();
	const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(text, 'application/xml');
	return xmlToJson(xmlDoc.documentElement);
};

export const useEPG = (url: string) => {
	const setChannels = useEPGStore(s => s.setChannels);
	return useQuery({
		queryKey: ['epg'],
		queryFn: async () => {
			const data = await fetchEPG();
			const normalized = mapProgrammesToChannels(data);
			setChannels(normalized);
			return normalized;
		}
	});
};
