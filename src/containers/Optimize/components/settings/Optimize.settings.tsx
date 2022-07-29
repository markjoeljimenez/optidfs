import { ChangeEvent, useEffect } from 'react';
import { useGetPlayersQuery } from 'src/api';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { Status, StatusTranslation } from 'src/interfaces/IStatus';

import Input from '@/components/form/input';

import {
	setNumberOfGenerations,
	setStatusFilters,
} from '../../redux/Optimize.reducers';

const OptimizeSettings = () => {
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

	function handleNumberOfLineupsChange(e: ChangeEvent<HTMLInputElement>) {
		dispatch(setNumberOfGenerations(parseInt(e.currentTarget.value)));
	}

	function handleStatusFilterChange(e: ChangeEvent<HTMLInputElement>) {
		const statusFilters = [...optimize.settings.statusFilters];
		const value = e.currentTarget.value as keyof typeof Status;

		if (statusFilters.includes(value)) {
			const filter = optimize.settings.statusFilters.indexOf(value);

			statusFilters.splice(filter, 1);
		} else {
			statusFilters.push(value);
		}

		dispatch(setStatusFilters(statusFilters));
	}

	useEffect(() => {
		console.log(optimize.settings.statusFilters);
	}, [optimize.settings.statusFilters]);

	return (
		<>
			<Input
				id="number-of-generations"
				label="Number of generations"
				min={1}
				type="number"
				value={optimize.settings.numberOfLineups}
				onChange={handleNumberOfLineupsChange}
			/>
			<div className="space-y-4">
				<label className="block">
					<input
						checked={optimize.settings.statusFilters.length === 0}
						id="status-N/A"
						type="radio"
						value=""
						// onChange={handleStatusFilterChange}
					/>
					All
				</label>
				{playersResponse.data?.statusFilters.map((status) => (
					<label
						key={`status-${status}`}
						className="block"
						htmlFor={`status-${status}`}
					>
						<input
							id={`status-${status}`}
							type="checkbox"
							value={status}
							onChange={handleStatusFilterChange}
						/>
						{StatusTranslation[status]}
					</label>
				))}
			</div>
		</>
	);
};

export default OptimizeSettings;
