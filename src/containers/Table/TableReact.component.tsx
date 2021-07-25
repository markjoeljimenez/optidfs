/* eslint-disable react/jsx-key */
import { Column, useTable } from 'react-table';
import { useAppSelector } from '../../hooks';
import { useMemo, useState } from 'react';

import { IDraftKingsPlayer } from '../../interfaces/IDraftKingsResponse';

import Error from '../Error/Error.component';
import TableSearch from './components/Table.search';
import clsx from 'clsx';

const KEYS: Column<IDraftKingsPlayer>[] = [
	// { Header: 'Positions', accessor: 'draft_positions' },
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

			return total;
		},
	},
];

const Table = () => {
	const { error, players, contests } = useAppSelector((state) => state);

	const [view, setView] = useState('all');
	const data = useMemo(() => {
		if (view === 'optimized' && players.optimized) {
			return players.optimized;
		}

		if (view === 'all' && players.all) {
			return players.all;
		}

		return [];
	}, [players, view]);
	const columns = useMemo(() => KEYS, []);

	const {
		footerGroups,
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({ columns, data });

	return players.all || players.optimized ? (
		<>
			<div className="px-8 py-3 border-t border-gray-200 flex items-center">
				<div className="flex-1 space-x-3 font-medium">
					<button
						className={clsx(
							view === 'all' ? 'bg-gray-200' : '',
							'rounded',
							'p-2'
						)}
						onClick={() => setView('all')}
					>
						All
					</button>
					<button
						className={clsx(
							view === 'optimized' ? 'bg-gray-200' : '',
							players.optimized === undefined
								? 'text-gray-300 cursor-default'
								: '',
							'rounded',
							'p-2'
						)}
						onClick={() => setView('optimized')}
						disabled={players.optimized === undefined}
					>
						Optimized
					</button>
				</div>
				<span className="font-light flex-1 text-center">
					{contests.gameType}
				</span>
				<div className="flex-1 flex justify-end">
					<TableSearch />
				</div>
			</div>
			<table {...getTableProps()} className="w-full table-fixed">
				<thead className="border-b border-t border-gray-200">
					{headerGroups.map((headerGroup) => (
						<tr
							{...headerGroup.getHeaderGroupProps()}
							className="bg-gray-50"
						>
							{headerGroup.headers.map((column) => (
								<th
									{...column.getHeaderProps()}
									className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									{column.render('Header')}
								</th>
							))}
						</tr>
					))}
				</thead>

				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);

						return (
							<tr
								{...row.getRowProps()}
								className="border-b border-gray-200"
							>
								{row.cells.map((cell) => {
									if (cell.column.Header === 'Salary') {
										cell.column.Cell =
											new Intl.NumberFormat('en-US', {
												style: 'currency',
												currency: 'USD',
												minimumFractionDigits: 0,
											}).format(cell.value);
									}

									return (
										<td
											{...cell.getCellProps()}
											className="px-8 py-4"
										>
											{cell.render('Cell')}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>

				{players.optimized && (
					<tfoot>
						{footerGroups.map((group) => (
							<tr
								{...group.getFooterGroupProps()}
								className="border-b border-gray-200 font-bold"
							>
								{group.headers.map((column) => (
									<td
										{...column.getFooterProps()}
										className="px-8 py-4"
									>
										{column.render('Footer')}
									</td>
								))}
							</tr>
						))}
					</tfoot>
				)}
			</table>
		</>
	) : error.display ? (
		<div className="container mx-auto py-4">
			<Error />
		</div>
	) : (
		<></>
	);
};

export default Table;
