import React from 'react';

import { Dashboard } from '@/features/dashboard/Dashboard';
import { VideoPlayer } from '@/features/videoPlayer/VideoPlayer';

const App: React.FC = () => {
	return (
		<div className="relative min-h-screen overflow-hidden">
			<VideoPlayer />

			{/* Blur overlay */}
			<div className="fixed inset-0 backdrop-blur-sm -z-5"></div>

			{/* Dark gradient overlay */}
			<div className="fixed inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 -z-5"></div>

			<div className="relative z-10">
				<Dashboard />
			</div>
		</div>
	);
};

export default App;
