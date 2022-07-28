import { IconSettings } from '@tabler/icons';
import router from 'next/router';
import { useEffect } from 'react';

import Contests from '@/containers/Contests';
import Optimize from '@/containers/Optimize';
import Table from '@/containers/Table';

import { useAppSelector } from '../../hooks';

const Index = () => {
	const { contests, global, providers, sports } = useAppSelector(
		(state) => state
	);

	useEffect(() => {
		if (!global.hasVisited) {
			router.push('/optimize/start/1', undefined, {
				shallow: true,
			});
		}
	}, [contests.selectedContest, providers.provider, sports.selectedSport]);

	return (
		<div className="flex-1">
			<div>
				<div className="flex space-x-4 justify-between">
					<Contests />

					<div className="flex space-x-3">
						<Optimize />

						{/* <button className="px-4 py-3 border-gray-100 border bg-white text-gray-600 rounded shadow font-black hover:bg-gray-200">
							<IconSettings />
						</button> */}
					</div>
				</div>
				<Table />
			</div>
		</div>
	);
};

export default Index;
