import SkipLink from '../components/global/skiplink';

import Header from '../components/global/header';

export interface ILayoutProps {
	children: React.ReactNode;
}

const Dashboard = ({ children }: ILayoutProps) => (
	<>
		<Header />

		<main className="dashboard main">
			<div className="main__container">{children}</div>
		</main>
	</>
);

export default Dashboard;
