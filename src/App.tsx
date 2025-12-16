import React, { Fragment } from 'react';

import { Dashboard } from '@/features/dashboard/Dashboard';

import { useEPG } from '@/shared/hooks/useEPG';

import { EPG_URL } from '@/shared/constants';

const App: React.FC = () => {
	useEPG(EPG_URL);

	return (
		<Fragment>
			<Dashboard />
		</Fragment>
	);
};

export default App;
