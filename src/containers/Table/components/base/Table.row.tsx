import { IconChevronDown, IconChevronRight } from '@tabler/icons';
import { flexRender, Row } from '@tanstack/react-table';
import clsx from 'clsx';

import { IPlayer, PlayerStatusMap } from '@/containers/Players';

import { TableToggle } from '../Table.toggle';

interface ITableRow {
	row: Row<IPlayer>;
}

export const TableRow = ({ row }: ITableRow) => {
	const showAdditionalControls =
		PlayerStatusMap.get(row.getValue('status'))?.color !== 'red';

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

				<div className="p-4 whitespace-nowrap" role="cell">
					{showAdditionalControls && (
						<TableToggle id={row.original.id} />
					)}
				</div>

				{row.getCanExpand() && (
					<div className="p-4 whitespace-nowrap" role="cell">
						{showAdditionalControls && (
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
						)}
					</div>
				)}
			</div>

			{row.getIsExpanded() && (
				<div key={`${row.id}-subrow`} role="row">
					<div role="cell">Expanded row</div>
				</div>
			)}
		</>
	);
};
