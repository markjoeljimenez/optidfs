import clsx from 'clsx';

import { Providers } from '@/containers/Providers';
import Sports from '@/containers/Sports';

import Nav from '../components/global/nav';
import { useAppSelector } from '../hooks';

interface ILayoutProps {
	children: React.ReactNode;
}

const Dashboard = ({ children }: ILayoutProps) => {
	const { global } = useAppSelector((state) => state);

	return (
		<div className="md:flex md:h-screen bg-gray-100">
			<Nav />

			<div className="md:flex md:flex-col w-full h-screen">
				<header className="border-b border-gray-200 bg-white">
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
						'h-full overflow-y-hidden flex',
						!global.hasVisited ? 'items-center justify-center' : ''
					)}
				>
					{children}
				</main>
			</div>
		</div>
	);
};

export default Dashboard;
