/* eslint-disable react/jsx-key */
import { useExpanded, useGlobalFilter, useTable } from 'react-table';
import { useAppDispatch, useAppSelector } from '../../hooks';
import React, { useMemo } from 'react';
import clsx from 'clsx';

import { setPage, setView } from '../Table/Table.actions';
import { updateLineupsPage } from '../Players/Players.actions';

import Error from '../Error/Error.component';
import TableSearch from './components/Table.search';
import KEYS from './Table.columns';

const Table = () => {
	const { error, players, contests, table } = useAppSelector(
		(state) => state
	);
	const dispatch = useAppDispatch();

	const data = useMemo(() => {
		if (table.view === 'optimized' && players.optimized) {
			return players.optimized;
		}

		if (table.view === 'all' && players.all) {
			return players.all;
		}

		return [];
	}, [players, table.view]);
	const columns = useMemo(() => KEYS, []);

	const {
		footerGroups,
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		state,
		preGlobalFilteredRows,
		setGlobalFilter,
		visibleColumns,
	} = useTable({ columns, data }, useGlobalFilter, useExpanded) as any;

	function handleNext() {
		const pageNum = table.page + 1;

		if (players.lineups && pageNum < players.lineups?.length) {
			dispatch(setPage(pageNum));
			dispatch(updateLineupsPage(pageNum));
		}
	}

	function handlePrevious() {
		const pageNum = table.page - 1;

		if (players.lineups && pageNum >= 0) {
			dispatch(setPage(pageNum));
			dispatch(updateLineupsPage(pageNum));
		}
	}

	return players.all || players.optimized ? (
		<>
			<div className="px-8 py-3 flex items-center">
				<div className="flex-1 space-x-3 font-medium">
					<button
						className={clsx(
							table.view === 'all' ? 'bg-gray-100' : '',
							'rounded',
							'p-2'
						)}
						onClick={() => dispatch(setView('all'))}
					>
						All
					</button>
					{players.optimized !== undefined && (
						<button
							className={clsx(
								table.view === 'optimized' ? 'bg-gray-100' : '',
								'rounded',
								'p-2'
							)}
							onClick={() => dispatch(setView('optimized'))}
							disabled={players.optimized === undefined}
						>
							Optimized
						</button>
					)}
				</div>
				<span className="font-light flex-1 text-center">
					{contests.gameType}
				</span>
				<div className="flex-1 flex justify-end space-x-2 text-gray-600">
					<TableSearch
						preGlobalFilteredRows={preGlobalFilteredRows}
						globalFilter={state.globalFilter}
						setGlobalFilter={setGlobalFilter}
					/>
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
							d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
						/>
					</svg>
					<span className="mx-3">&middot;</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className={clsx(
							'h-5 w-5',
							players.optimized
								? 'stroke-current'
								: 'text-gray-200'
						)}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
				</div>
			</div>
			<table {...getTableProps()} className="w-full table-auto">
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

						const rowProps = row.getRowProps();
						delete rowProps.role;

						return (
							<React.Fragment {...rowProps}>
								<tr className="border-b border-gray-200">
									{row.cells.map((cell) => {
										switch (cell.column.Header) {
											case 'Salary':
												cell.column.Cell =
													new Intl.NumberFormat(
														'en-US',
														{
															style: 'currency',
															currency: 'USD',
															minimumFractionDigits: 0,
														}
													).format(cell.value);

											default:
												cell.column.Cell;
										}

										return (
											<td
												{...cell.getCellProps()}
												className="px-8 py-4 whitespace-nowrap"
											>
												{cell.render('Cell')}
											</td>
										);
									})}
								</tr>

								{row.isExpanded ? (
									<tr>
										<td
											colSpan={visibleColumns.length}
											className="px-8 py-4 bg-gray-50 border-b border-gray-200"
										>
											this is the content
										</td>
									</tr>
								) : null}
							</React.Fragment>
						);
					})}
				</tbody>

				{players.optimized && table.view === 'optimized' && (
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
						{players.optimized &&
							players.lineups &&
							players.lineups.length > 1 && (
								<tr>
									<td colSpan={6} className="px-8 py-4">
										<div className="flex justify-between items-center">
											<button
												type="button"
												onClick={handlePrevious}
											>
												<span className="sr-only">
													Previous
												</span>

												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-4 w-4"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M15 19l-7-7 7-7"
													/>
												</svg>
											</button>

											<p>
												{`${table.page + 1} of ${
													players.lineups.length
												} generated lineups`}
											</p>

											<button
												type="button"
												onClick={handleNext}
											>
												<span className="sr-only">
													Next
												</span>
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
														d="M9 5l7 7-7 7"
													/>
												</svg>
											</button>
										</div>
									</td>
								</tr>
							)}
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
