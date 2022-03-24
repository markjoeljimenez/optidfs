import { useAppSelector } from '../hooks';

import Nav from '../components/global/nav';
import Sports from '../containers/Sports/Sports.component';
import clsx from 'clsx';

export interface ILayoutProps {
	children: React.ReactNode;
}

const Dashboard = ({ children }: ILayoutProps) => {
	const { providers, sports, global } = useAppSelector((state) => state);

	const isLoaded =
		global.hasVisited && providers.provider && sports.selectedSport;

	return (
		<div className="md:flex md:min-h-screen bg-gray-100">
			<Nav />

			<div className="md:flex md:flex-col w-full">
				<header
					className="border-b border-gray-200 bg-white"
					data-testid="header"
				>
					<div className="mx-auto py-4 px-6 md:p-8 md:flex justify-between items-center">
						{isLoaded && (
							<ul className="flex space-x-4">
								<li>
									<Providers />
								</li>
								<li>
									<Sports />
								</li>
							</ul>
						)}
					</div>
				</header>

				<main
					// className={clsx(
					// 	'flex-1 flex flex-col',
					// 	!isLoaded ? 'items-center justify-center' : ''
					// )}
					// className="flex-1"
					data-testid="main-content"
				>
					{children}
				</main>

				{/* <main>{selectedSport ? <>{children}</> : <></>}</main> */}
			</div>
		</div>
	);
};

export default Dashboard;
