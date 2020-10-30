import Nav from '../components/global/nav';
import SkipLink from '../components/global/skiplink';

export interface ILayoutProps {
	children: React.ReactNode;
}

const Dashboard = ({ children }: ILayoutProps) => (
	<div className="md:flex md:min-h-screen text-blue-800">
		<Nav />

		<main className="w-full">{children}</main>
	</div>
);

export default Dashboard;
