import {
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
import React, { ChangeEvent, useEffect, useReducer, useState } from 'react';
import { useGetOptimizedLineupsMutation, useGetPlayersQuery } from 'src/api';

import { setFilteredPlayers } from '@/containers/Players/redux/Players.reducers';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import useTableColumns from '../hooks/useTableColumns';
import TableBody from './base/Table.body';
import TableFooter from './base/Table.footer';
import TableFooterOptimize from './base/Table.footer.optimize';
import TableFooterPagination from './base/Table.footer.pagination';
import TableHeader from './base/Table.header';
import TablePreheader from './base/Table.preheader';

const Table = () => {
	const { stacking } = useFlags(['stacking']);
	const { contests, providers, table } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const columns = useTableColumns();
	const rerender = useReducer(() => ({}), {})[1];

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
	const [_getOptimizedLineups, optimizeResponse] =
		useGetOptimizedLineupsMutation({
			fixedCacheKey: 'optimize',
		});

	const _table = useReactTable({
		autoResetExpanded: true,
		columns,
		data:
			optimizeResponse.data &&
			optimizeResponse.data?.length &&
			typeof table.view === 'number'
				? optimizeResponse.data[table.view].players
				: playersResponse.data ?? [],
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
		if (_table.getState().columnFilters.length) {
			dispatch(setFilteredPlayers(_table.getFilteredRowModel().rows));
		}
	}, [_table.getState().columnFilters]);

	// useEffect(() => {
	// 	if (optimizeResponse.data?.length) {
	// 		rerender();
	// 	}
	// }, [optimizeResponse.data]);

	return (
		<div className="w-full bg-white text-left relative" role="table">
			<div className="sticky top-0 z-10">
				{/* Gap at top of screen */}
				<div className="bg-gray-100 h-[2rem] mt-[1px]" />

				<TablePreheader
					value={globalFilter}
					onGlobalSearch={onGlobalSearch}
				/>
				<TableHeader stacking={stacking} table={_table} />
			</div>

			<TableBody response={playersResponse} table={_table} />

			<TableFooter>
				{optimizeResponse.data &&
					optimizeResponse.data?.length > 1 &&
					table.view !== '' &&
					typeof table.view === 'number' && <TableFooterOptimize />}

				{table.view === '' &&
					playersResponse.isSuccess &&
					playersResponse.data &&
					playersResponse.data?.length >
						_table.getState().pagination.pageSize && (
						<TableFooterPagination table={_table} />
					)}
			</TableFooter>
		</div>
	);
};

export default Table;
