import router from 'next/router';
import { useEffect } from 'react';

import Contests from '@/containers/Contests';
import Table from '@/containers/Table/components/Table.component';

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
			<div className="space-y-3">
				<Contests />
				<Table />
			</div>
		</div>
	);
};

export default Index;
