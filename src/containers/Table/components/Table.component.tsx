import {
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { useFlags } from 'flagsmith/react';
import React, { useEffect, useMemo } from 'react';
import { useGetPlayersQuery } from 'src/api';

import Chevron from '@/components/icons/chevron';
import { Direction } from '@/components/icons/chevron-triangle';
import Loading from '@/components/loading/loading';
import { IPlayer, setDefaultPlayers } from '@/containers/Players';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import StatusFilter from './filters/Table.filters.status';
import TableSortSalary from './sort/Table.sort.salary';
import useColumns from './Table.columns';
import TableRow from './Table.row';

const Table = () => {
	const { stacking } = useFlags(['stacking']);
	const { contests, players, providers, table } = useAppSelector(
		(state) => state
	);
	const dispatch = useAppDispatch();
	const columns = useColumns();

	const { data, isFetching, isLoading, isSuccess } = useGetPlayersQuery(
		{
			// gameType: contests.gameType,
			id: contests.selectedContest?.contest_id!,
			provider: providers.provider!,
		},
		{
			skip: !contests.selectedContest || !providers.provider,
		}
	);

	useEffect(() => {
		if (data) {
			dispatch(setDefaultPlayers(data));
		}
	}, [data]);

	const memoizedData = useMemo<IPlayer[]>(() => {
		// if (table.view === 'optimized' && players.optimized) {
		// 	return players.optimized;
		// }

		if (table.view === 'all' && players?.defaultPlayers) {
			return players.defaultPlayers;
		}

		return [];
	}, [players.defaultPlayers, table.view]);

	// const columns = useMemo<ColumnDef<IPlayer>[]>(
	// 	() => columnKeys,
	// 	[contests.gameType]
	// );

	// const defaultColumn = useMemo(
	// 	() => ({
	// 		// Let's set up our default Filter UI
	// 		Filter: MultiSelectColumnFilter,
	// 	}),
	// 	[]
	// );

	// const filterTypes = useMemo(
	// 	() => ({
	// 		multiple: (rows, id, filterValue) => {
	// 			return rows.filter((row) => {
	// 				const rowValue = row.values[id];
	// 				return rowValue !== undefined
	// 					? filterValue.includes(rowValue)
	// 					: true;
	// 			});
	// 		},
	// 	}),
	// 	[]
	// );

	const _table = useReactTable({
		autoResetExpanded: true,
		columns,
		data: memoizedData,
		debugColumns: false,
		debugHeaders: true,
		debugTable: true,
		enableExpanding: true,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getRowCanExpand: () => true,
		getSortedRowModel: getSortedRowModel(),
		initialState: {
			pagination: {
				pageSize: 20,
			},
		},
	});

	function renderTableBody() {
		if (isLoading || isFetching) {
			return (
				<div role="row">
					<div className="p-4 whitespace-nowrap" role="cell">
						<Loading text="Loading players. This may take a while..." />
					</div>
				</div>
			);
		}

		if (!data || !data.length) {
			return (
				<div role="row">
					<div className="p-4 whitespace-nowrap" role="cell">
						No players available
					</div>
				</div>
			);
		}

		return _table
			.getRowModel()
			.rows.map((row) => <TableRow key={row.id} row={row} />);
	}

	function renderTableFooter() {
		if (memoizedData.length && isSuccess) {
			return (
				<div role="rolegroup">
					<div role="row">
						<div
							className="p-4 whitespace-nowrap flex justify-end"
							role="cell"
						>
							<span>
								Page{' '}
								<strong>
									{_table.getState().pagination.pageIndex + 1}{' '}
									of {_table.getPageCount()}
								</strong>
							</span>
							<span className="ml-4">|</span>
							<div className="inline-block ml-4">
								<button
									className={clsx(
										'h-5 w-5',
										!_table.getCanPreviousPage() &&
											'text-gray-300'
									)}
									disabled={!_table.getCanPreviousPage()}
									onClick={() => _table.previousPage()}
								>
									<Chevron direction={Direction.Left} />
								</button>
								<button
									className={clsx(
										'h-5 w-5',
										!_table.getCanNextPage() &&
											'text-gray-300'
									)}
									disabled={!_table.getCanNextPage()}
									onClick={() => _table.nextPage()}
								>
									<Chevron direction={Direction.Right} />
								</button>
							</div>
						</div>
					</div>
				</div>
			);
		}

		return null;
	}

	return (
		<div className="w-full bg-white text-left" role="table">
			<div className="border-b border-t border-gray-200" role="rowgroup">
				{_table.getHeaderGroups().map((headerGroup) => (
					<div
						key={headerGroup.id}
						className={clsx(
							'bg-gray-50 grid items-center',
							stacking.enabled
								? 'grid-cols-table-md-stacking-ff'
								: 'grid-cols-table-md'
						)}
						role="row"
					>
						{headerGroup.headers.map((header) => (
							<div
								key={header.id}
								className={clsx(
									'relative p-4 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap',
									['status'].includes(header.id) &&
										'flex items-center justify-center text-center',
									['salary', 'fppg'].includes(header.id) &&
										'flex items-center justify-end text-right'
								)}
								role="columnheader"
							>
								{flexRender(
									header.column.columnDef.header,
									header.getContext()
								)}

								{header.column.getCanFilter() && (
									<div className="ml-1">
										<StatusFilter column={header.column} />
									</div>
								)}

								{header.column.getCanSort() && (
									<div className="ml-1">
										<TableSortSalary
											column={header.column}
										/>
									</div>
								)}
							</div>
						))}
					</div>
				))}
			</div>

			<div role="rowgroup">{renderTableBody()}</div>

			{renderTableFooter()}
		</div>
	);
};

export default Table;
