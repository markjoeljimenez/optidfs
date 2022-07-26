import { flexRender, Table } from '@tanstack/react-table';
import clsx from 'clsx';

import { IPlayer } from '@/containers/Players';

import TableStatusFilter from '../filters/Table.filters.status';
import TableSortSalary from '../sort/Table.sort.headers';

interface ITableHeader {
	stacking: {
		enabled: boolean;
	};
	table: Table<IPlayer>;
}

const TableHeader = ({ stacking, table }: ITableHeader) => (
	<div className="border-b border-t border-gray-200" role="rowgroup">
		{table.getHeaderGroups().map((headerGroup) => (
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
								<TableStatusFilter column={header.column} />
							</div>
						)}

						{header.column.getCanSort() && (
							<div className="ml-1">
								<TableSortSalary column={header.column} />
							</div>
						)}
					</div>
				))}
			</div>
		))}
	</div>
);

export default TableHeader;
