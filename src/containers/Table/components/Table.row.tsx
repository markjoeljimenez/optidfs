import { flexRender, Row } from '@tanstack/react-table';
import clsx from 'clsx';
import { useFlags } from 'flagsmith/react';

import More from '@/components/icons/more';
import { IPlayer } from '@/containers/Players';

interface ITableRow {
	row: Row<IPlayer>;
}

const TableRow = ({ row }: ITableRow) => {
	const { stacking } = useFlags(['stacking']);

	return (
		<>
			<div
				key={row.id}
				className={clsx(
					'border-b border-gray-200 grid items-center',
					stacking.enabled
						? 'grid-cols-table-md-stacking-ff'
						: 'grid-cols-table-md'
				)}
				role="row"
			>
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

				{row.getCanExpand() && stacking.enabled && (
					<div className="p-4 whitespace-nowrap" role="cell">
						<button
							onClick={() =>
								row.toggleExpanded(!row.getIsExpanded())
							}
						>
							<More />
						</button>
					</div>
				)}
			</div>

			{row.getIsExpanded() && stacking.enabled && (
				<div key={`${row.id}-subrow`} role="row">
					<div role="cell">Expanded row</div>
				</div>
			)}
		</>
	);
};

export default TableRow;
