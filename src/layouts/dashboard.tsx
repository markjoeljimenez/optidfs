import { useAppSelector } from '../hooks';

import Dropdown from '../containers/Dropdown/Dropdown.component';
import Nav from '../components/global/nav';
import Upload from '../containers/Upload/Upload.component';
import Optimize from '../containers/Optimize/Optimize.component';

export interface ILayoutProps {
	children: React.ReactNode;
}

const Dashboard = ({ children }: ILayoutProps) => {
	const { contests, sports, table, tabs, players } = useAppSelector(
		(state) => state
	);
	const { selectedSport } = sports;
	const { contest } = contests;

	return (
		<div className="md:flex md:min-h-screen">
			<Nav />

			<div className="md:flex md:flex-col w-full">
				<header className="border-b border-gray-200 bg-white">
					<div className="mx-auto py-4 px-6 md:p-8 md:flex justify-between items-center"></div>
				</header>

				<main>{selectedSport ? <>{children}</> : <></>}</main>
			</div>
		</div>
	);
};

export default Dashboard;
