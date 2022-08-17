import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks';

import Select, { IValueLabel } from '@/components/form/select';
import { useGetOptimizedLineupsMutationResponse } from '@/containers/Optimize';

import { setView } from '../reducers/Table.reducers';

export const TableView = () => {
	const { table } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const [_getOptimizedLineups, optimizeResponse] =
		useGetOptimizedLineupsMutationResponse();

	function handleChange(e: ChangeEvent<HTMLSelectElement>) {
		const { value } = e.currentTarget;

		dispatch(setView(value !== '' ? parseInt(value) : value));
	}

	const options =
		optimizeResponse.data?.lineups.map<IValueLabel>((_lineup, i) => ({
			label: `Lineup ${i + 1}`,
			value: i,
		})) ?? [];

	return (
		<Select
			hideLabel
			id="table-view-select"
			label="Select lineup"
			options={[
				{
					label: 'All',
					value: '',
				},
				...options,
			]}
			value={table.view!.toString()}
			onChange={handleChange}
		/>
	);
};
