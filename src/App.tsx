import React from 'react';
import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';

import { useEPG } from '@/shared/hooks/useEPG';

import { EPG_URL } from '@/shared/constants';

import { useEPGStore } from '@/shared/store';

const App: React.FC = () => {
	const { t } = useTranslation('translation');
	const { data } = useEPG(EPG_URL);
	const channels = useEPGStore(s => s.channels);
	console.log('Channels from store:', channels);

	return (
		<div>
			<h1 className="text-2xl font-semibold text-red-600 text">
				{t('helloWorld')}
			</h1>
			<LanguageSwitcher />
		</div>
	);
};

export default App;
