import { useMemo } from 'react';
import { Column } from 'react-table';
import { IDraftKingsPlayer } from '../../interfaces/IDraftKingsResponse';

const KEYS: Column<IDraftKingsPlayer>[] = [
	// { Header: 'Positions', accessor: 'draft_positions' },
	{ Header: () => null, id: 'lockExclude' },
	{ Header: 'First Name', accessor: 'first_name', Footer: 'Total' },
	{ Header: 'Last Name', accessor: 'last_name' },
	{ Header: 'Position', accessor: 'position' },
	{ Header: 'Team', accessor: 'team' },
	{
		Header: 'Salary',
		accessor: 'salary',
		Footer: (info) => {
			const total = useMemo(
				() =>
					info.rows.reduce((sum, row) => row.values.salary + sum, 0),
				[info.rows]
			);

			return new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
				minimumFractionDigits: 0,
			}).format(total);
		},
	},
	{
		Header: 'FPPG',
		accessor: 'points_per_contest',
		Footer: (info) => {
			const total = useMemo(
				() =>
					info.rows.reduce(
						(sum, row) => row.values.points_per_contest + sum,
						0
					),
				[info.rows]
			);

			return total.toFixed(2);
		},
	},
	{
		Header: () => null,
		id: 'moreActions',
		// eslint-disable-next-line react/display-name
		Cell: ({ row }) => (
			<span {...row.getToggleRowExpandedProps()}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5 text-gray-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
					/>
				</svg>
			</span>
		),
	},
];

export default KEYS;
