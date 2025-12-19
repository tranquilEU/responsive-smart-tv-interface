import { create } from 'zustand';

import { DEFAULT_STREAM_URL } from '@/shared/constants';

import { NormalizedChannel } from '@/shared/types/types';

type EPGState = {
	channels: NormalizedChannel[];
	currentStream: string;
	setChannels: (channels: NormalizedChannel[]) => void;
	setCurrentStream: (stream: string) => void;
	clear: () => void;
};

export const useEPGStore = create<EPGState>(set => ({
	channels: [],
	currentStream: DEFAULT_STREAM_URL,
	setChannels: channels => set({ channels }),
	setCurrentStream: currentStream => set({ currentStream }),
	clear: () => set({ channels: [] })
}));
