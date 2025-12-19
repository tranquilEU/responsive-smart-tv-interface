export const EPG_URL = 'https://tvprofil.net/xmltv/data/epg_tvprofil.net.xml';
export const PROXY_SERVER_URL = 'http://localhost:4000';
export const DEFAULT_STREAM_URL =
	'https://bitmovin-a.akamaihd.net/content/art-of-motion_drm/mpds/11331.mpd';
export const DRM_LICENSE_SERVER =
	'https://cwip-shaka-proxy.appspot.com/no_auth';

export const STREAMS = [
	{
		id: 'angelOne',
		name: 'Angel One',
		url: 'https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
	},
	{
		id: 'tearsOfSteel',
		name: 'Tears of Steel',
		url: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8'
	},
	{
		id: 'bigBuckBunny',
		name: 'Big Buck Bunny',
		url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
	}
];
