import router from 'next/router';
import { useEffect } from 'react';

import Contests from '@/containers/Contests';

import Table from '../../containers/Table/Table.component';
import { useAppDispatch, useAppSelector } from '../../hooks';

const Index = () => {
	const { contests, providers, sports } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (
			!providers.provider ||
			!sports.selectedSport ||
			!contests.selectedContest
		) {
			router.push('/optimize/start/1', undefined, {
				shallow: true,
			});

			return;
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
