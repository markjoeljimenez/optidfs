import {
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import React, { useEffect, useMemo } from 'react';
import { useGetPlayersQuery } from 'src/api';

import Loading from '@/components/loading/loading';
import { IPlayer, setDefaultPlayers } from '@/containers/Players';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import columnKeys from './Table.columns';
import TableRow from './Table.row';

const Table = () => {
	const { contests, players, providers, table } = useAppSelector(
		(state) => state
	);
	const dispatch = useAppDispatch();

	const { data, isFetching, isLoading } = useGetPlayersQuery(
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
		columns: columnKeys,
		data: memoizedData,
		// defaultColumn,
		// filterTypes,
		enableExpanding: true,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getRowCanExpand: () => true,
		initialState: {
			pagination: {
				pageSize: 50,
			},
		},
	});

	function renderTableBody() {
		if (isLoading || isFetching) {
			return (
				<tr>
					<td
						className="p-4 whitespace-nowrap"
						colSpan={columnKeys.length}
					>
						<Loading text="Loading players. This may take a while..." />
					</td>
				</tr>
			);
		}

		if (!data || !data.length) {
			return (
				<tr>
					<td
						className="p-4 whitespace-nowrap"
						colSpan={columnKeys.length}
					>
						No players available
					</td>
				</tr>
			);
		}

		return _table
			.getRowModel()
			.rows.map((row) => <TableRow key={row.id} row={row} />);
	}

	return (
		<table className="w-full table-auto relative border-collapse bg-white text-left">
			<thead className="border-b border-t border-gray-200">
				{_table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id} className="bg-gray-50">
						{headerGroup.headers.map((header) => (
							<th
								key={header.id}
								className={clsx(
									'relative p-4 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap',
									['status'].includes(header.id) &&
										'text-center',
									['salary', 'fppg'].includes(header.id) &&
										'text-right'
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

			<tbody>{renderTableBody()}</tbody>
		</table>
	);
};

export default Table;
