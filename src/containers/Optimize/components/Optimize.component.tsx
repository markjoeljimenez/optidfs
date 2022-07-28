import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useGetOptimizedLineupsMutation, useGetPlayersQuery } from 'src/api';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { Status } from 'src/interfaces/IStatus';

import Loading from '@/components/loading/loading';
import { setView } from '@/containers/Table/reducers/Table.reducers';

import { setOptimizedLineups } from '../redux/Optimize.reducers';

interface IOptimizeProps {
	disabled?: boolean;
}

const Optimize = ({ disabled }: IOptimizeProps) => {
	const { contests, players, providers, sports, table } = useAppSelector(
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
			players: players.filteredPlayers ?? defaultPlayers!,
			provider: providers.provider!,
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
		<button
			className="px-4 py-3 bg-indigo-700 text-white rounded shadow font-black hover:bg-indigo-800 flex"
			data-testid="optimize"
			disabled={disabled || response.isLoading}
			type="button"
			onClick={handleClick}
		>
			{response.isLoading && <Loading />}
			Optimize
		</button>
	);
};

export default Optimize;
