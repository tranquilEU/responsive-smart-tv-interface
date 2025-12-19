import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'core-js/stable';
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'regenerator-runtime/runtime';

import App from './App';
import './shared/global.css';

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root')!);
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</React.StrictMode>
);
