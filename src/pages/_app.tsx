import '../styles/styles.scss';

import * as Sentry from '@sentry/browser';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { resolveValue, Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { useAppLocalStorage } from 'src/hooks/useAppLocalStorage';

import Toast from '@/components/toast/toast';

import Dashboard from '../layouts/dashboard';
import { setupStore } from '../store';

const App = ({ Component, pageProps }: AppProps) => {
	if (process.env.NODE_ENV !== 'development' && process.env.SENTRY_DSN) {
		Sentry.init({
			dsn: process.env.SENTRY_DSN,
			environment: process.env.NODE_ENV,
		});
	}

	const [localStorage] = useAppLocalStorage();
	const [preloadedStoreState, setPreloadedStoreState] = useState({});

	useEffect(() => {
		if (localStorage) {
			let state = {};

			if (localStorage?.provider) {
				state = {
					...state,
					providers: { provider: localStorage.provider },
				};
			}

			if (localStorage?.sport) {
				state = {
					...state,
					sports: {
						selectedSport: localStorage.sport,
					},
				};
			}

			if (localStorage?.contest) {
				state = {
					...state,
					contests: { contest: localStorage.contest },
				};
			}

			setPreloadedStoreState(state);
		}
	}, [localStorage]);

	return (
		<Provider store={setupStore(preloadedStoreState)}>
			<Toaster
				position="top-right"
				toastOptions={{
					duration: 5000,
					error: {
						duration: Infinity,
					},
				}}
			>
				{(t) => <Toast {...t}>{resolveValue(t.message, t)}</Toast>}
			</Toaster>
			<DefaultSeo
				title="Optidfs"
				description="A web app that generates the most optimized lineups for DraftKings."
			/>
			<Dashboard>
				<Component {...pageProps} />
			</Dashboard>
		</Provider>
	);
};

export default App;
