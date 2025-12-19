import { STREAMS } from '@/shared/constants';

import { normalizeProgrammeTime } from '@/shared/utils/normaliseProgrammeTime';

import { Channel, NormalizedChannel, Programme } from '@/shared/types/types';

export const mapProgrammesToChannels = (data: any): NormalizedChannel[] => {
	const channels: Record<string, Channel> = {};

	data.channel.forEach((ch: any) => {
		const randomStream =
			STREAMS[Math.floor(Math.random() * STREAMS.length)] ?? '';
		const id = ch['@attributes'].id;
		channels[id] = {
			id,
			name: ch['display-name']['#text'],
			url: ch.url?.['#text'] ?? '',
			icon: ch.icon?.['@attributes']?.src ?? '',
			streamURL: randomStream
		};
	});

	const normalized: Record<string, NormalizedChannel> = {};
	Object.values(channels).forEach(ch => {
		normalized[ch.id] = { ...ch, programmes: [] };
	});

	data.programme.forEach((prog: any) => {
		const randomStream =
			STREAMS[Math.floor(Math.random() * STREAMS.length)] ?? '';
		const channelId = prog['@attributes'].channel;
		const programme: Programme = {
			channelId,
			start: normalizeProgrammeTime(prog['@attributes'].start),
			stop: normalizeProgrammeTime(prog['@attributes'].stop),
			title: prog.title?.['#text'] ?? '',
			desc: prog.desc?.['#text'] ?? '',
			streamURL: randomStream
		};
		if (normalized[channelId]) {
			normalized[channelId].programmes.push(programme);
		}
	});

	return Object.values(normalized);
};
