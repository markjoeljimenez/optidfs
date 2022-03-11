import { useAppSelector } from '../hooks';

import Nav from '../components/global/nav';
import Providers from '../containers/Providers/Providers.components';
import Sports from '../containers/Sports/Sports.component';

import { selectSports } from '../containers/Sports/Sports.reducers';

export interface ILayoutProps {
	children: React.ReactNode;
}

const Dashboard = ({ children }: ILayoutProps) => {
	const { selectedSport } = useAppSelector(selectSports);

	return (
		<div className="md:flex md:min-h-screen">
			<Nav />

			<div className="md:flex md:flex-col w-full">
				<header className="border-b border-gray-200 bg-white">
					<div className="mx-auto py-4 px-6 md:p-8 md:flex justify-between items-center">
						<ul className="flex space-x-4">
							<li>
								<Providers />
							</li>
							<li>
								<Sports />
							</li>
						</ul>
					</div>
				</header>

				<main>{selectedSport ? <>{children}</> : <></>}</main>
			</div>
		</div>
	);
};

export default Dashboard;
