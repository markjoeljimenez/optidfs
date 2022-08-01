import { ChangeEvent } from 'react';
import { useGetPlayersQuery } from 'src/api';
import { useAppDispatch, useAppSelector } from 'src/hooks';

import { PlayerStatusMap, TPlayerStatus } from '@/containers/Players';

import { setStatusFilters } from '../../redux/Optimize.reducers';

const OptimizeStatusFilters = () => {
	const { contests, optimize, providers } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const playersResponse = useGetPlayersQuery(
		{
			// gameType: contests.gameType,
			id: contests.selectedContest?.contest_id!,
			provider: providers.provider!,
		},
		{
			skip: !contests.selectedContest || !providers.provider,
		}
	);

	function handleStatusFilterChange(e: ChangeEvent<HTMLInputElement>) {
		const statusFilters = [...optimize.settings.statusFilters];
		const value = e.currentTarget.value as TPlayerStatus;

		if (statusFilters.includes(value)) {
			const filter = optimize.settings.statusFilters.indexOf(value);

			statusFilters.splice(filter, 1);
		} else {
			statusFilters.push(value);
		}

		dispatch(setStatusFilters(statusFilters));
	}

	function handleAllStatusFilterChange() {
		dispatch(setStatusFilters([]));
	}

	return (
		<fieldset>
			<legend className="sr-only">Status Filters</legend>
			<div
				aria-hidden="true"
				className="block text-sm font-medium text-gray-700"
			>
				Status Filters
			</div>
			<ul className="space-y-3 mt-2">
				<li>
					<label>
						<input
							checked={
								optimize.settings.statusFilters.length === 0
							}
							className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
							id="status-N/A"
							type="radio"
							value=""
							onChange={handleAllStatusFilterChange}
						/>
						<span className="ml-3 text-sm">All</span>
					</label>
				</li>

				{playersResponse.data?.statusFilters.map((status) => (
					<li key={`status-${status}`}>
						<label htmlFor={`status-${status}`}>
							<input
								checked={optimize.settings.statusFilters?.includes(
									status
								)}
								className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
								id={`status-${status}`}
								type="checkbox"
								value={status}
								onChange={handleStatusFilterChange}
							/>
							<span className="ml-3 text-sm">
								{PlayerStatusMap.get(status)?.translation}
							</span>
						</label>
					</li>
				))}
			</ul>
		</fieldset>
	);
};

export default OptimizeStatusFilters;
