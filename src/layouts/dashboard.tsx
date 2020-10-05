import SkipLink from '../components/global/skiplink';

import Header from '../containers/Header/Header';

export interface ILayoutProps {
	children: React.ReactNode;
}

const Dashboard = ({ children }: ILayoutProps) => (
	<div className="md:flex md:min-h-screen text-blue-800">
		<Header />

		<main className="w-full">{children}</main>
	</div>
);

export default Dashboard;
