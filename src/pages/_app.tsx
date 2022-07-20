import '../styles/styles.scss';

import * as Sentry from '@sentry/browser';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { resolveValue, Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Toast from '@/components/toast/toast';

import Dashboard from '../layouts/dashboard';
import store, { persistor } from '../store';

const App = ({ Component, pageProps }: AppProps) => {
	if (process.env.NODE_ENV !== 'development' && process.env.SENTRY_DSN) {
		Sentry.init({
			dsn: process.env.SENTRY_DSN,
			environment: process.env.NODE_ENV,
		});
	}

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
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
					description="A web app that generates the most optimized lineups for DraftKings."
					title="Optidfs"
				/>
				<Dashboard>
					<Component {...pageProps} />
				</Dashboard>
			</PersistGate>
		</Provider>
	);
};

export default App;
