import * as Sentry from '@sentry/browser';
import { Provider } from 'react-redux';
import { useStore } from '../store';

import 'normalize.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'tippy.js/dist/tippy.css';

import '../styles/styles.scss';
import Dashboard from '../layouts/dashboard';

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

	const store = useStore(pageProps.initialReduxState);

	return (
		<Provider store={store}>
			<Dashboard>
				<Component {...pageProps} />
			</Dashboard>
		</Provider>
	);
};

export default App;
