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
import React, {
	ChangeEvent,
	useEffect,
	useReducer,
	useRef,
	useState,
} from 'react';
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

	const [globalFilter, setGlobalFilter] = useState('');
	const tableRef = useRef<HTMLDivElement>(null);
	const tableBodyRef = useRef<HTMLDivElement>(null);
	const [scrollbarWidth, setScrollbarWidth] = useState(0);

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

	useEffect(() => {
		setScrollbarWidth(
			tableRef.current && tableBodyRef.current
				? tableRef.current.offsetWidth -
						tableBodyRef.current.clientWidth
				: 0
		);
	}, []);

	return (
		<div
			ref={tableRef}
			className="w-full bg-white text-left relative h-full flex flex-col"
			id="table"
			role="table"
		>
			<TablePreheader
				scrollbarWidth={scrollbarWidth}
				value={globalFilter}
				onGlobalSearch={onGlobalSearch}
			/>
			<TableHeader
				scrollbarWidth={scrollbarWidth}
				stacking={stacking}
				table={_table}
			/>

			<div className="max-h-full overflow-y-auto">
				<TableBody
					ref={tableBodyRef}
					response={playersResponse}
					table={_table}
				/>
			</div>

			<TableFooter scrollbarWidth={scrollbarWidth}>
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
