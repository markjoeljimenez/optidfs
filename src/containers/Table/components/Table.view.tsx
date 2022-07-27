import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks';

import Select, { IValueLabel } from '@/components/form/select';

import { setView } from '../reducers/Table.reducers';

const TableView = () => {
	const { optimize, table } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	function handleChange(e: ChangeEvent<HTMLSelectElement>) {
		const { value } = e.currentTarget;

		dispatch(setView(value !== '' ? parseInt(value) : value));
	}

	const options =
		optimize.optimizedLineups?.map<IValueLabel>((_lineup, i) => ({
			label: `Lineup ${i + 1}`,
			value: i,
		})) ?? [];

	return (
		<Select
			id="table-view-select"
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

export default TableView;
