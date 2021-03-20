import { useAppSelector } from '../hooks';

import Dropdown from '../containers/Dropdown/Dropdown';
import Nav from '../components/global/nav';
import SkipLink from '../components/global/skiplink';
import Providers from '../containers/Providers/Providers';
import Sports from '../containers/Sports/Sports.component';
import Upload from '../containers/Upload/Upload';

export interface ILayoutProps {
	children: React.ReactNode;
}

const Dashboard = ({ children }: ILayoutProps) => {
	const { sports } = useAppSelector((state) => state);

	return (
		<div className="md:flex md:min-h-screen text-blue-800">
			<Nav />

			<main className="w-full">
				{sports.sport && (
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
