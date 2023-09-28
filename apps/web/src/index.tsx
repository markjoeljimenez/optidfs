import '@mantine/core/styles.css';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { StrictMode } from 'react';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<StrictMode>
		<Router>
			<MantineProvider defaultColorScheme="dark">
				<App />
			</MantineProvider>
		</Router>
	</StrictMode>
);
