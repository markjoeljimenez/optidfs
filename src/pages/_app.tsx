import '../styles/styles.scss';

import * as Sentry from '@sentry/browser';
import flagsmith from 'flagsmith/isomorphic';
import { FlagsmithProvider } from 'flagsmith/react';
import { IState } from 'flagsmith/types';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Notifications from '@/components/toast/notifications';

import Dashboard from '../layouts/dashboard';
import store, { persistor } from '../store';

type Props = AppProps & { flagsmithState: IState };

const { FLAGSMITH_ENVIRONMENT_ID } = process.env;

const App = ({ Component, flagsmithState, pageProps }: Props) => {
	if (process.env.NODE_ENV !== 'development' && process.env.SENTRY_DSN) {
		Sentry.init({
			dsn: process.env.SENTRY_DSN,
			environment: process.env.NODE_ENV,
		});
	}

	return (
		<FlagsmithProvider flagsmith={flagsmith} serverState={flagsmithState}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Notifications />
					<DefaultSeo
						description="A web app that generates the most optimized lineups for DraftKings."
						title="Optidfs"
					/>
					<Dashboard>
						<Component {...pageProps} />
					</Dashboard>
				</PersistGate>
			</Provider>
		</FlagsmithProvider>
	);
};

App.getInitialProps = async () => {
	await flagsmith.init({
		environmentID: FLAGSMITH_ENVIRONMENT_ID!,
		// identity: 'my_user_id', // optionaly specify the identity of the user to get their specific flags
	});

	return { flagsmithState: flagsmith.getState() };
};

export default App;
