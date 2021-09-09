/* eslint-disable react/display-name */
import { useMemo } from 'react';
import { Column } from 'react-table';
import { IDraftKingsPlayer } from '../../../interfaces/IDraftKingsResponse';

import Toggle from './Table.lockExclude';

const KEYS = (gameType?: string) =>
	[
		// { Header: 'Positions', accessor: 'draft_positions' },
		{
			Header: () => null,
			accessor: 'id',
			Cell: (cell) => {
				return <Toggle id={cell.value} />;
			},
		},
		{ Header: 'First Name', accessor: 'first_name', Footer: 'Total' },
		{ Header: 'Last Name', accessor: 'last_name' },
		{
			Header: 'Position',
			accessor: (accessor) =>
				gameType?.includes('Showdown')
					? accessor.position
					: accessor.draft_positions,
		},
		{ Header: 'Team', accessor: 'team' },
		{
			Header: () => <div className="text-right">Salary</div>,
			accessor: 'salary',
			Footer: (info) => {
				const total = useMemo(
					() =>
						info.rows.reduce(
							(sum, row) => row.values.salary + sum,
							0
						),
					[info.rows]
				);

				return (
					<div className="text-right">
						{new Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'USD',
							minimumFractionDigits: 0,
						}).format(total)}
					</div>
				);
			},
			Cell: (cell) => (
				<div className="text-right">
					{new Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: 'USD',
						minimumFractionDigits: 0,
					}).format(cell.value)}
				</div>
			),
		},
		{
			Header: () => <div className="text-right">FPPG</div>,
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

				return <div className="text-right">{total.toFixed(2)}</div>;
			},
			Cell: (cell) => <div className="text-right">{cell.value}</div>,
		},
		{
			Header: () => null,
			id: 'more_actions',
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
	] as Column<IDraftKingsPlayer>[];

export default KEYS;
