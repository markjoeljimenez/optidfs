import { flexRender, Row } from '@tanstack/react-table';
import { useFlags } from 'flagsmith/react';

import More from '@/components/icons/more';
import { IPlayer } from '@/containers/Players';

import columnKeys from './Table.columns';

interface ITableRow {
	row: Row<IPlayer>;
}

const TableRow = ({ row }: ITableRow) => {
	const { stacking } = useFlags(['stacking']);

	return (
		<>
			<tr key={row.id} className="border-b border-gray-200">
				{row.getVisibleCells().map((cell) => (
					<td key={cell.id} className="p-4 whitespace-nowrap">
						{flexRender(
							cell.column.columnDef.cell,
							cell.getContext()
						)}
					</td>
				))}

				{row.getCanExpand() && stacking.enabled && (
					<td className="p-4 whitespace-nowrap">
						<button
							onClick={() =>
								row.toggleExpanded(!row.getIsExpanded())
							}
						>
							<More />
						</button>
					</td>
				)}
			</tr>

			{row.getIsExpanded() && stacking.enabled && (
				<tr key={`${row.id}-subrow`}>
					<td colSpan={columnKeys.length + 1}>Expanded row</td>
				</tr>
			)}
		</>
	);
};

export default TableRow;
