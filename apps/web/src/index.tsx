import '@mantine/core/styles.css';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@optidfs/store';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<StrictMode>
		<Provider store={store}>
			<Router>
				<MantineProvider defaultColorScheme="dark">
					<App />
				</MantineProvider>
			</Router>
		</Provider>
	</StrictMode>
);
