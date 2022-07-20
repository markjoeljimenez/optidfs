import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppLocalStorage } from 'src/hooks/useAppLocalStorage';

import Contests from '@/containers/Contests';
import { setProvider } from '@/containers/Providers';
import { setSelectedSport } from '@/containers/Sports';

import { setSelectedContest } from '../../containers/Contests/redux/reducers';
import Table from '../../containers/Table/Table.component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setHasVisited } from '../../store';

const Index = () => {
	const { contests, providers, sports } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [localStorage] = useAppLocalStorage();

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
			// dispatch(setProvider(localStorage.provider));
			// dispatch(setSelectedSport(localStorage.sport));
			// dispatch(setSelectedContest(localStorage.contest));
			dispatch(setHasVisited(true));

			return;
		}

		router.push('/optimize/start/1', undefined, {
			shallow: true,
		});
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
