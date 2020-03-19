import Head from 'next/head';

import SkipLink from '../components/skiplink';

import 'normalize.css';
import '../styles/style.scss';

import config from '../data/site.json';

export interface ILayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => (
	<>
		<Head>
			<title>{config.title}</title>
			<link rel="icon" href="/favicon.ico" />
			<meta name="description" content={config.description} />
		</Head>

		<SkipLink text="Skip to content" />

		<main>{children}</main>
	</>
);

export default Layout;
