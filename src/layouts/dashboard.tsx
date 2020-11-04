import Nav from '../components/global/nav';
import SkipLink from '../components/global/skiplink';
import Providers from '../containers/Providers/Providers';
import Sports from '../containers/Sports/Sports';

export interface ILayoutProps {
	children: React.ReactNode;
	sport: any;
}

const Dashboard = ({ children, sport }: ILayoutProps) => (
	<div className="md:flex md:min-h-screen text-blue-800">
		<Nav />

		<main className="w-full">
			<div className="bg-gray-100 border-b border-gray-200">
				<div className="mx-auto p-8 flex justify-end">
					<div className="space-x-4 flex">
						<Providers />
						<Sports />
					</div>
				</div>
			</div>

			{children}
		</main>
	</div>
);

export default Dashboard;
