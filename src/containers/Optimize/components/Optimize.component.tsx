import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from 'src/hooks';

import Button from '@/components/form/button';
import Loading from '@/components/loading/loading';
import { useGetPlayersQueryResponse } from '@/containers/Players';
import { setView } from '@/containers/Table/reducers/Table.reducers';

import useGetOptimizedLineupsMutationResponse from '../hooks/useGetOptimizedLineupsMutationResponse';
import { setOptimizedLineups } from '../redux/Optimize.reducers';

interface IOptimizeProps {
	disabled?: boolean;
}

const Optimize = ({ disabled }: IOptimizeProps) => {
	const { optimize, providers, sports } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const { data: defaultPlayers } = useGetPlayersQueryResponse();
	const [getOptimizedLineups, response] =
		useGetOptimizedLineupsMutationResponse();

	function handleClick() {
		getOptimizedLineups({
			// draftGroupId: contests.selectedContest?.contest_id!,
			players: defaultPlayers!.players,
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
