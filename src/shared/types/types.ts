export type Channel = { id: string; name: string; url: string; icon: string };

export type Programme = {
	channelId: string;
	start: string;
	stop: string;
	title: string;
	desc: string;
};

export type NormalizedChannel = Channel & { programmes: Programme[] };
