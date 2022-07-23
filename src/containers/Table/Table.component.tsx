/* eslint-disable react/jsx-key */
import { skipToken } from '@reduxjs/toolkit/dist/query';
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	// defaultColumn,
	// useExpanded,
	// useFilters,
	// useGlobalFilter,
	// usePagination,
	useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import React, { useEffect, useMemo } from 'react';
import { useGetPlayersQuery } from 'src/api';

import Loading, { LoadingSize } from '@/components/loading/loading';
import { IPlayer, playersState, setDefaultPlayers } from '@/containers/Players';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { contestsState } from '../Contests/redux/Contests.reducers';
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

	const { data } = useGetPlayersQuery(
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

	console.log(memoizedData);

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

	const _table = useReactTable(
		{
			// autoResetExpanded: false,
			// autoResetPage: false,
			columns: columnKeys,
			data: memoizedData,
			// defaultColumn,
			// filterTypes,
			getCoreRowModel: getCoreRowModel(),
			initialState: { pageSize: 100 } as any,
		}
		// useFilters,
		// useGlobalFilter,
		// useExpanded,
		// usePagination
	);

	return (
		<table className="w-full table-auto relative border-collapse bg-white text-left">
			<thead className="border-b border-t border-gray-200">
				{_table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id} className="bg-gray-50">
						{headerGroup.headers.map((header) => (
							<th
								key={header.id}
								className={clsx(
									'relative p-4 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap'
								)}
								colSpan={header.colSpan}
							>
								{flexRender(
									header.column.columnDef.header,
									header.getContext()
								)}
							</th>
						))}
					</tr>
				))}
			</thead>

			<tbody>
				{_table.getRowModel().rows.map((row) => (
					<tr key={row.id} className="border-b border-gray-200">
						{row.getVisibleCells().map((cell) => (
							<td
								key={cell.id}
								className="px-8 py-4 whitespace-nowrap"
							>
								{flexRender(
									cell.column.columnDef.cell,
									cell.getContext()
								)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
