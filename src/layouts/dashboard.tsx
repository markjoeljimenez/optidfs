import clsx from 'clsx';

import Providers from '@/containers/Providers';
import Sports from '@/containers/Sports';

import Nav from '../components/global/nav';
import { useAppSelector } from '../hooks';

interface ILayoutProps {
	children: React.ReactNode;
}

const Dashboard = ({ children }: ILayoutProps) => {
	const { global } = useAppSelector((state) => state);

	return (
		<div className="md:flex md:min-h-screen bg-gray-100">
			<Nav />

			<div className="md:flex md:flex-col w-full">
				<header
					className="border-b border-gray-200 bg-white"
					data-testid="header"
				>
					<div className="mx-auto py-4 px-6 md:p-8 md:flex justify-between items-center">
						{global.hasVisited && (
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
					className={clsx(
						'flex-1 flex flex-col',
						'p-8',
						!global.hasVisited ? 'items-center justify-center' : ''
					)}
					data-testid="main-content"
				>
					{children}
				</main>
			</div>
		</div>
	);
};

export default Dashboard;
