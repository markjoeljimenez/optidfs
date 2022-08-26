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
import React, {
	ChangeEvent,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import { useGetOptimizedLineupsMutationResponse } from '@/containers/Optimize';
import { useGetPlayersQueryResponse } from '@/containers/Players';

import { useAppSelector } from '../../../hooks';
import { useTableColumns } from '../hooks/useTableColumns';
import { TableBody } from './base/Table.body';
import { TableFooter } from './base/Table.footer';
import { TableFooterOptimize } from './base/Table.footer.optimize';
import { TableFooterPagination } from './base/Table.footer.pagination';
import { TableHeader } from './base/Table.header';
import { TablePreheader } from './base/Table.preheader';

export const Table = () => {
	const { table } = useAppSelector((state) => state);
	const columns = useTableColumns();
	const playersResponse = useGetPlayersQueryResponse();
	const [_getOptimizedLineups, optimizeResponse] =
		useGetOptimizedLineupsMutationResponse();

	const [globalFilter, setGlobalFilter] = useState('');
	const tableRef = useRef<HTMLDivElement>(null);
	const tableBodyRef = useRef<HTMLDivElement>(null);
	const [scrollbarWidth, setScrollbarWidth] = useState(0);

	const data = useMemo(() => {
		if (optimizeResponse.data && table.view !== '') {
			return optimizeResponse.data?.lineups[table.view as number].players;
		}

		if (playersResponse.currentData) {
			return playersResponse.currentData.players;
		}

		return [];
	}, [optimizeResponse.data, table.view, playersResponse]);

	const _table = useReactTable({
		autoResetExpanded: true,
		columns,
		data,
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
	}, [optimizeResponse.data, table.view, playersResponse]);

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
			<TableHeader scrollbarWidth={scrollbarWidth} table={_table} />

			<div className="max-h-full overflow-y-auto">
				<TableBody
					ref={tableBodyRef}
					isFetching={playersResponse.isFetching}
					isLoading={playersResponse.isLoading}
					players={playersResponse.currentData?.players}
					table={_table}
				/>
			</div>

			<TableFooter scrollbarWidth={scrollbarWidth}>
				{optimizeResponse.data && table.view !== '' && (
					<TableFooterOptimize />
				)}

				{table.view === '' &&
					playersResponse.isSuccess &&
					playersResponse.currentData &&
					playersResponse.currentData.players.length >
						_table.getState().pagination.pageSize && (
						<TableFooterPagination table={_table} />
					)}
			</TableFooter>
		</div>
	);
};
