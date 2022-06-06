import '../styles/styles.scss';

import * as Sentry from '@sentry/browser';
import { DefaultSeo } from 'next-seo';
import { resolveValue, Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

import Toast from '@/components/toast/toast';

import Dashboard from '../layouts/dashboard';
import store from '../store';

interface IApp {
	Component: any;
	pageProps: any;
}

const App = ({ Component, pageProps }: IApp) => {
	if (process.env.NODE_ENV !== 'development' && process.env.SENTRY_DSN) {
		Sentry.init({
			dsn: process.env.SENTRY_DSN,
			environment: process.env.NODE_ENV,
		});
	}

	return (
		<Provider store={store}>
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
