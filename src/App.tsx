import React from 'react';
import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';

const App: React.FC = () => {
	const { t } = useTranslation('translation');
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
