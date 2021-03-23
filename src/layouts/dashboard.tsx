import { useAppSelector } from '../hooks';

import Dropdown from '../containers/Dropdown/Dropdown.component';
import Nav from '../components/global/nav';
import SkipLink from '../components/global/skiplink';
import Providers from '../containers/Providers/Providers.components';
import Sports from '../containers/Sports/Sports.component';
import Upload from '../containers/Upload/Upload.component';

export interface ILayoutProps {
	children: React.ReactNode;
}

const Dashboard = ({ children }: ILayoutProps) => {
	const { selectedSport } = useAppSelector((state) => state.sports);

	return (
		<div className="md:flex md:min-h-screen text-blue-800">
			<Nav />

			<main className="w-full">
				{selectedSport && (
					<>
						<div className="border-b border-gray-300">
							<div className="container mx-auto py-4 px-6 md:p-8 md:flex justify-between items-center">
								<div className="flex flex-1 justify-between">
									<Upload />
									<div className="flex items-center mx-4">
										or
									</div>
									<div className="flex-1">
										<Dropdown />
									</div>
								</div>
							</div>
						</div>

						{children}
					</>
				)}
			</main>
		</div>
	);
};

export default Dashboard;
