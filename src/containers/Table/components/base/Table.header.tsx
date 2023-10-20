import { flexRender, Table } from '@tanstack/react-table';
import clsx from 'clsx';

import { IPlayer } from '@/containers/Players';

import TableStatusFilter from '../filters/Table.filters.status';
import { TableSort } from '../sort/Table.sort.headers';

interface ITableHeader {
	scrollbarWidth: number;
	table: Table<IPlayer>;
}

export const TableHeader = ({ scrollbarWidth, table }: ITableHeader) => (
	<div
		className="border-b border-t border-gray-200 bg-gray-50"
		role="rowgroup"
		style={{ paddingRight: `${scrollbarWidth}px` }}
	>
		{table.getHeaderGroups().map((headerGroup) => (
			<div
				key={headerGroup.id}
				className={clsx(
					'grid items-center',
					'grid-cols-table-md-stacking-ff'
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
								<TableStatusFilter column={header.column} />
							</div>
						)}

						{header.column.getCanSort() && (
							<div className="ml-1">
								<TableSort column={header.column} />
							</div>
						)}
					</div>
				))}
			</div>
		))}
	</div>
);