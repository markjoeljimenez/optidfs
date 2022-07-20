import React from 'react';
import { useAsyncDebounce } from 'react-table';

import Input from '../../../components/form/input';
import { useAppDispatch } from '../../../hooks';
import { setView } from '../Table.actions';

const TableSearch = ({
	globalFilter,
	preGlobalFilteredRows,
	setGlobalFilter,
}) => {
	const dispatch = useAppDispatch();

	const [value, setValue] = React.useState(globalFilter);
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 200);

	return (
		<div className="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<Input
				id="tableSearch"
				label="Search by player or team"
				hideLabel
				type="text"
				placeholder="Search by player or team"
				className="ml-3"
				value={value || ''}
				onChange={(e) => {
					setValue(e.target.value);
					onChange(e.target.value);
					dispatch(setView('all'));
				}}
			/>
		</div>
	);
};

export default TableSearch;
