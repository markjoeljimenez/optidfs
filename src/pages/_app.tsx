import * as Sentry from '@sentry/browser';
import { DefaultSeo } from 'next-seo';
import { Provider } from 'react-redux';

import Dashboard from '../layouts/dashboard';
import store from '../store';

import '../styles/styles.scss';

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
