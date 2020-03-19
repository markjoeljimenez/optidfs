import * as Sentry from '@sentry/browser';

import 'normalize.css';
import '../styles/styles.scss';

const App = ({ Component, pageProps }) => {
	if (process.env.NODE_ENV !== 'development' && process.env.SENTRY_DSN) {
		Sentry.init({
			dsn: process.env.SENTRY_DSN,
			environment: process.env.NODE_ENV,
		});
	}

	return <Component {...pageProps} />;
};

export default App;
