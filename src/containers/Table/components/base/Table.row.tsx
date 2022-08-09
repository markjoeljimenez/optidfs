import { IconChevronDown, IconChevronRight } from '@tabler/icons';
import { flexRender, Row } from '@tanstack/react-table';
import clsx from 'clsx';

import { IPlayer } from '@/containers/Players';

interface ITableRow {
	row: Row<IPlayer>;
}

const TableRow = ({ row }: ITableRow) => {
	return (
		<>
			<div
				key={row.id}
				className={clsx(
					'border-b border-gray-200 grid items-center',
					'grid-cols-table-md-stacking-ff'
				)}
				role="row"
			>
				{row.getCanExpand() && (
					<div className="p-4 whitespace-nowrap" role="cell">
						<button
							onClick={() =>
								row.toggleExpanded(!row.getIsExpanded())
							}
						>
							{row.getIsExpanded() ? (
								<IconChevronDown />
							) : (
								<IconChevronRight />
							)}
						</button>
					</div>
				)}

				{row.getVisibleCells().map((cell) => (
					<div
						key={cell.id}
						className="p-4 whitespace-nowrap"
						role="cell"
					>
						{flexRender(
							cell.column.columnDef.cell,
							cell.getContext()
						)}
					</div>
				))}
			</div>

			{row.getIsExpanded() && (
				<div key={`${row.id}-subrow`} role="row">
					<div role="cell">Expanded row</div>
				</div>
			)}
		</>
	);
};

export default TableRow;
