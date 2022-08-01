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
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useGetOptimizedLineupsMutation } from 'src/api';

import useGetPlayersQueryResponse from '@/containers/Players/hooks/useGetPlayersQueryResponse';

import { useAppSelector } from '../../../hooks';
import useTableColumns from '../hooks/useTableColumns';
import TableBody from './base/Table.body';
import TableFooter from './base/Table.footer';
import TableFooterOptimize from './base/Table.footer.optimize';
import TableFooterPagination from './base/Table.footer.pagination';
import TableHeader from './base/Table.header';
import TablePreheader from './base/Table.preheader';

const Table = () => {
	const { stacking } = useFlags(['stacking']);
	const { table } = useAppSelector((state) => state);
	const columns = useTableColumns();

	const [globalFilter, setGlobalFilter] = useState('');
	const tableRef = useRef<HTMLDivElement>(null);
	const tableBodyRef = useRef<HTMLDivElement>(null);
	const [scrollbarWidth, setScrollbarWidth] = useState(0);

	const playersResponse = useGetPlayersQueryResponse();
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
				: playersResponse.data?.players ?? [],
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
					isFetching={playersResponse.isFetching}
					isLoading={playersResponse.isLoading}
					players={playersResponse.data?.players}
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
					playersResponse.data?.players.length >
						_table.getState().pagination.pageSize && (
						<TableFooterPagination table={_table} />
					)}
			</TableFooter>
		</div>
	);
};

export default Table;
