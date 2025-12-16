import { create } from 'zustand';

import { NormalizedChannel } from '@/shared/types/types';

type EPGState = {
	channels: NormalizedChannel[];
	setChannels: (channels: NormalizedChannel[]) => void;
	clear: () => void;
};

export const useEPGStore = create<EPGState>(set => ({
	channels: [],
	setChannels: channels => set({ channels }),
	clear: () => set({ channels: [] })
}));
