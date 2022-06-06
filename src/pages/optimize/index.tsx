import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useLocalStorage } from 'react-use';

import Contests from '@/containers/Contests';
import { setProvider } from '@/containers/Providers';
import { setSelectedSport } from '@/containers/Sports';

import { setSelectedContest } from '../../containers/Contests/redux/reducers';
import Table from '../../containers/Table/Table.component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setHasVisited } from '../../store';

const Index = () => {
	const { sports, contests, providers } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [value] = useLocalStorage('optidfs-initial-visit');

	/**
	 * If there is a local storage value, set redux state
	 * and go to step 3 (view players)
	 */
	useEffect(() => {
		if (value) {
			if (
				!providers.provider &&
				!sports.selectedSport &&
				!contests.selectedContest
			) {
				dispatch(setProvider(value.provider));
				dispatch(setSelectedSport(value.sport));
				dispatch(setSelectedContest(value.contest));
				dispatch(setHasVisited(true));
			}

			return;
		}

		router.push('/optimize/start', '', { shallow: true });
	}, [value]);

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
