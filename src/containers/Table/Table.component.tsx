/* eslint-disable react/jsx-key */
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useMemo } from 'react';
import {
	defaultColumn,
	useExpanded,
	useFilters,
	useGlobalFilter,
	usePagination,
	useTable,
} from 'react-table';
import { useGetPlayersQuery } from 'src/api';

import Loading, { LoadingSize } from '@/components/loading/loading';
import { playersState, setDefaultPlayers } from '@/containers/Players';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { contestsState } from '../Contests/redux/reducers';
import { MultiSelectColumnFilter } from './components/filters/StatusFilter';
import columnKeys from './components/Table.columns';
import TableSubRow from './components/Table.subRow';
import { selectTable } from './Table.reducers';

const Table = () => {
	const { contests, players, providers, table } = useAppSelector(
		(state) => state
	);
	// const players = useAppSelector(playersState);
	// const contests = useAppSelector(contestsState);
	// const table = useAppSelector(selectTable);
	const dispatch = useAppDispatch();

	const response = useGetPlayersQuery(
		{
			gameType: contests.gameType,
			id: contests.selectedContest?.contest_id!,
			provider: providers.provider!,
		},
		{
			skip: !contests.selectedContest || !providers.provider,
		}
	);

	useEffect(() => {
		if (response.data) {
			dispatch(setDefaultPlayers({ players: response.data }));
		}
	}, [response.data]);

	const data = useMemo(() => {
		// if (table.view === 'optimized' && players.optimized) {
		// 	return players.optimized;
		// }

		if (table.view === 'all' && players?.defaultPlayers) {
			return players.defaultPlayers;
		}

		return [];
	}, [players, table.view]);

	const columns = useMemo(
		() => columnKeys(contests.gameType!),
		[contests.gameType]
	);

	const defaultColumn = useMemo(
		() => ({
			// Let's set up our default Filter UI
			Filter: MultiSelectColumnFilter,
		}),
		[]
	);

	const filterTypes = useMemo(
		() => ({
			multiple: (rows, id, filterValue) => {
				return rows.filter((row) => {
					const rowValue = row.values[id];
					return rowValue !== undefined
						? filterValue.includes(rowValue)
						: true;
				});
			},
		}),
		[]
	);

	const {
		canNextPage,
		canPreviousPage,
		footerGroups,
		getTableBodyProps,
		getTableProps,
		headerGroups,
		nextPage,
		page,
		pageOptions,
		preGlobalFilteredRows,
		prepareRow,
		previousPage,
		setGlobalFilter,
		state: { globalFilter, pageIndex },
		visibleColumns,
	} = useTable(
		{
			autoResetExpanded: false,
			autoResetPage: false,
			columns,
			data,
			defaultColumn,
			filterTypes,
			initialState: { pageSize: 100 } as any,
		} as any,
		useFilters,
		useGlobalFilter,
		useExpanded,
		usePagination
	) as any;

	return !response.isLoading && !response.isFetching ? (
		<table
			{...getTableProps()}
			className="w-full table-auto relative border-collapse"
		>
			<thead className="border-b border-t border-gray-200">
				{headerGroups.map((headerGroup) => (
					<tr
						{...headerGroup.getHeaderGroupProps()}
						className="bg-gray-50"
					>
						{headerGroup.headers.map((column) => (
							<th
								{...column.getHeaderProps()}
								className="relative px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
							>
								{column.render('Header')}
								{/* Render the columns filter UI */}
								<div className="inline-block align-middle ml-2">
									{column.canFilter
										? column.render('Filter')
										: null}
								</div>
							</th>
						))}
					</tr>
				))}
			</thead>

			<tbody {...getTableBodyProps()}>
				{page.map((row) => {
					prepareRow(row);

					const rowProps = row.getRowProps();
					delete rowProps.role;

					return (
						<React.Fragment {...rowProps}>
							<tr className="border-b border-gray-200">
								{row.cells.map((cell) => {
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
										className="px-8 py-4 bg-gray-50 border-b border-gray-200"
										colSpan={visibleColumns.length}
									>
										<TableSubRow player={row.original} />
									</td>
								</tr>
							) : null}
						</React.Fragment>
					);
				})}
			</tbody>

			<tfoot className="sticky bottom-0 bg-white">
				{table.view === 'all' && visibleColumns.length > 1 && (
					<tr>
						<td className="p-0" colSpan={visibleColumns.length}>
							<div className="flex justify-between border-t border-gray-200 px-8 py-4">
								<div>
									<button
										disabled={!canPreviousPage}
										onClick={() => previousPage()}
									>
										<svg
											className="h-5 w-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M15 19l-7-7 7-7"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
											/>
										</svg>
									</button>
								</div>
								<div className="flex-1 text-center">
									<span>
										Page {pageIndex + 1} of{' '}
										{pageOptions.length}
									</span>
								</div>
								<div>
									<button
										disabled={!canNextPage}
										onClick={() => nextPage()}
									>
										<svg
											className="h-5 w-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M9 5l7 7-7 7"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
											/>
										</svg>
									</button>
								</div>
							</div>
						</td>
					</tr>
				)}

				{/* {players.optimized &&
				table.view === 'optimized' &&
				footerGroups.map((group) => (
					<tr
						{...group.getFooterGroupProps()}
						className="font-bold border-b border-t border-gray-200"
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
				players.lineups.length > 1 &&
				table.view === 'optimized' && (
					<tr className="border-b border-gray-200">
						<td
							colSpan={visibleColumns.length}
							className="px-8 py-4"
						>
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
										className="h-5 w-5"
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
				)} */}
			</tfoot>
		</table>
	) : (
		<Loading text="Loading players. This may take a while..." />
	);
};

export default Table;
