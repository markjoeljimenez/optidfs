import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Contests from '@/containers/Contests';

import Table from '../../containers/Table/Table.component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setHasVisited } from '../../store';

const Index = () => {
	const { contests, providers, sports } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const router = useRouter();

	/**
	 * If there is a local storage value, set redux state
	 * and go to step 3 (view players)
	 */
	useEffect(() => {
		if (
			!providers.provider &&
			!sports.selectedSport &&
			!contests.selectedContest
		) {
			router.push('/optimize/start/1', undefined, {
				shallow: true,
			});

			return;
		}

		dispatch(setHasVisited(true));
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
