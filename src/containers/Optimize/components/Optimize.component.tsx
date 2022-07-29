import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useGetOptimizedLineupsMutation, useGetPlayersQuery } from 'src/api';
import { useAppDispatch, useAppSelector } from 'src/hooks';

import Button from '@/components/form/button';
import Loading from '@/components/loading/loading';
import { setView } from '@/containers/Table/reducers/Table.reducers';

import { setOptimizedLineups } from '../redux/Optimize.reducers';

interface IOptimizeProps {
	disabled?: boolean;
}

const Optimize = ({ disabled }: IOptimizeProps) => {
	const { contests, optimize, providers, sports } = useAppSelector(
		(state) => state
	);
	const dispatch = useAppDispatch();
	const [getOptimizedLineups, response] = useGetOptimizedLineupsMutation({
		fixedCacheKey: 'optimize',
	});

	const { data: defaultPlayers } = useGetPlayersQuery({
		// gameType: contests.gameType,
		id: contests.selectedContest?.contest_id!,
		provider: providers.provider!,
	});

	function handleClick() {
		getOptimizedLineups({
			// draftGroupId: contests.selectedContest?.contest_id!,
			// players: players.filteredPlayers ?? defaultPlayers!, TODO: Shouldn't filter based on table view
			players: defaultPlayers!,
			provider: providers.provider!,
			settings: optimize.settings!,
			sport: sports.selectedSport!,
		});
	}

	useEffect(() => {
		if (response.data && response.isSuccess) {
			dispatch(setOptimizedLineups(response.data));
			dispatch(setView(0));

			toast.success(
				`Generated ${response.data.length} lineups successfully`
			);

			return;
		}

		if (response.error) {
			toast.error('There was an error while optimizing your lineups');
		}
	}, [response]);

	return (
		<Button
			disabled={disabled || response.isLoading}
			testId="optimize"
			onClick={handleClick}
		>
			{response.isLoading && <Loading />}
			Optimize
		</Button>
	);
};

export default Optimize;
