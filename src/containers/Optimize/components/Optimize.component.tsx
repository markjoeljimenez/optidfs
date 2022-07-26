import { useEffect } from 'react';
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

	const [getOptimizedLineups, { data }] = useGetOptimizedLineupsMutation();

	function handleClick() {
		getOptimizedLineups({
			// draftGroupId: contests.selectedContest?.contest_id!,
			players: players.defaultPlayers!,
			provider: providers.provider!,
			sport: sports.selectedSport!,
		});
	}

	useEffect(() => {
		if (data) {
			dispatch(setOptimizedLineups(data));
			dispatch(setView(0));
		}
	}, [data]);

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
