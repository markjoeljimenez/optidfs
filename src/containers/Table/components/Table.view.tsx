import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks';

import { setView } from '../reducers/Table.reducers';

const TableView = () => {
	const { optimize, table } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	function handleChange(e: ChangeEvent<HTMLSelectElement>) {
		const { value } = e.currentTarget;

		console.log(value);

		dispatch(setView(value !== '' ? parseInt(value) : value));
	}

	return (
		<select
			id="table-view-select"
			name="table-view-select"
			value={table.view}
			onChange={handleChange}
		>
			<option value="">All</option>

			{optimize.optimizedLineups?.map((lineup, i) => (
				<option key={i} value={i}>
					Lineup {i + 1}
				</option>
			))}
		</select>
	);
};

export default TableView;
