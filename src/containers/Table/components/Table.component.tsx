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
import { useFlags } from 'flagsmith/react';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useGetPlayersQuery } from 'src/api';

import { IPlayer, setDefaultPlayers } from '@/containers/Players';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import useTableColumns from '../hooks/useTableColumns';
import { setFilters } from '../reducers/Table.reducers';
import TableBody from './base/Table.body';
import TableFooter from './base/Table.footer';
import TableFooterOptimize from './base/Table.footer.optimize';
import TableFooterPagination from './base/Table.footer.pagination';
import TableHeader from './base/Table.header';
import TablePreheader from './base/Table.preheader';

const Table = () => {
	const { stacking } = useFlags(['stacking']);
	const { contests, optimize, players, providers, table } = useAppSelector(
		(state) => state
	);
	const dispatch = useAppDispatch();
	const columns = useTableColumns();
	const [globalFilter, setGlobalFilter] = useState('');

	const playersResponse = useGetPlayersQuery(
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
		if (playersResponse.data) {
			dispatch(setDefaultPlayers(playersResponse.data));
		}
	}, [playersResponse.data]);

	const memoizedData = useMemo<IPlayer[]>(() => {
		if (
			typeof table.view === 'number' &&
			optimize.optimizedLineups?.length
		) {
			return optimize.optimizedLineups![table.view].players;
		}

		if (!table.view && players?.defaultPlayers) {
			return players.defaultPlayers;
		}

		return [];
	}, [players.defaultPlayers, table.view, optimize.optimizedLineups]);

	const _table = useReactTable({
		autoResetExpanded: true,
		columns,
		data: memoizedData,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getRowCanExpand: () => true,
		getSortedRowModel: getSortedRowModel(),
		globalFilterFn: 'includesString',
		initialState: {
			pagination: {
				pageSize: 20,
			},
		},
		state: {
			globalFilter,
		},
	});

	function onGlobalSearch(e: ChangeEvent<HTMLInputElement>) {
		setGlobalFilter(String(e.currentTarget.value));
	}

	useEffect(() => {
		const { columnFilters } = _table.getState();

		if (columnFilters.length) {
			dispatch(setFilters(columnFilters));
		}
	}, [_table.getState()]);

	return (
		<div className="w-full bg-white text-left relative" role="table">
			<div className="sticky top-0 z-10">
				{/* Gap at top of screen */}
				<div className="bg-gray-100 h-[2rem]" />

				<TablePreheader
					value={globalFilter}
					onGlobalSearch={onGlobalSearch}
				/>
				<TableHeader stacking={stacking} table={_table} />
			</div>

			<TableBody response={playersResponse} table={_table} />

			<TableFooter>
				{optimize.optimizedLineups &&
					optimize.optimizedLineups?.length > 1 &&
					table.view !== '' &&
					typeof table.view === 'number' && <TableFooterOptimize />}

				{table.view === '' &&
					playersResponse.isSuccess &&
					players.defaultPlayers &&
					players.defaultPlayers?.length >
						_table.getState().pagination.pageSize && (
						<TableFooterPagination table={_table} />
					)}
			</TableFooter>
		</div>
	);
};

export default Table;
