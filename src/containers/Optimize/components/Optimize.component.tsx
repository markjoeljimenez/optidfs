import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useGetOptimizedLineupsMutation } from 'src/api';
import { useAppDispatch, useAppSelector } from 'src/hooks';

import { setView } from '@/containers/Table/reducers/Table.reducers';

import { setOptimizedLineups } from '../redux/Optimize.reducers';

interface IOptimizeProps {
	disabled?: boolean;
}

const Optimize = ({ disabled }: IOptimizeProps) => {
	const { players, providers, sports } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	const [getOptimizedLineups, response] = useGetOptimizedLineupsMutation();

	function handleClick() {
		getOptimizedLineups({
			// draftGroupId: contests.selectedContest?.contest_id!,
			players: players.defaultPlayers!,
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
		}
	}, [response]);

	return (
		<button
			className="px-4 py-3 bg-indigo-700 text-white rounded shadow font-black hover:bg-indigo-800"
			data-testid="optimize"
			disabled={disabled}
			type="button"
			onClick={handleClick}
		>
			Optimize
		</button>
	);
};

export default Optimize;
