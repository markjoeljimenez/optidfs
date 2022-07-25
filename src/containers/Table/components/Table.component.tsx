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
import TableBody from './base/Table.body';
import TableFooter from './base/Table.footer';
import TableHeader from './base/Table.header';
import TablePreheader from './base/Table.preheader';

const Table = () => {
	const { stacking } = useFlags(['stacking']);
	const { contests, players, providers, table } = useAppSelector(
		(state) => state
	);
	const dispatch = useAppDispatch();
	const columns = useTableColumns();
	const [globalFilter, setGlobalFilter] = useState('');

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

	return (
		<div className="w-full bg-white text-left" role="table">
			<TablePreheader
				value={globalFilter}
				onGlobalSearch={onGlobalSearch}
			/>
			<TableHeader stacking={stacking} table={_table} />
			<TableBody
				response={{ isFetching, isLoading, isSuccess }}
				table={_table}
			/>

			{memoizedData.length && isSuccess && _table.getPageCount() > 0 && (
				<TableFooter table={_table} />
			)}
		</div>
	);
};

export default Table;
