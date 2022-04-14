import { DefaultSeo } from 'next-seo';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import * as Sentry from '@sentry/browser';
import Dashboard from '../layouts/dashboard';
import store from '../store';

import 'react-toastify/dist/ReactToastify.minimal.css';
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
			<ToastContainer
				className="absolute top-4 right-4 p-4 rounded shadow"
				toastClassName="flex flex-row"
				draggable={false}
				hideProgressBar
				closeButton={({ closeButton }) => (
					<button onClick={closeButton}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width={24}
							height={24}
						>
							<g data-name="Layer 2">
								<g data-name="close">
									<rect
										width="24"
										height="24"
										transform="rotate(180 12 12)"
										opacity="0"
									/>
									<path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
								</g>
							</g>
						</svg>
					</button>
				)}
			/>
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
