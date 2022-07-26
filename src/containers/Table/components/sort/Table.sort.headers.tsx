import { Column } from '@tanstack/react-table';
import clsx from 'clsx';

import ChevronTriangle, {
	Direction,
} from '@/components/icons/chevron-triangle';
import { IPlayer } from '@/containers/Players';

interface ITableSortSalary {
	column: Column<IPlayer, unknown>;
}
const TableSortSalary = ({ column }: ITableSortSalary) => {
	function getDirection() {
		if (column.getIsSorted()) {
			if (column.getIsSorted() === 'desc') {
				return Direction.Down;
			}

			return Direction.Up;
		}

		return Direction.Down;
	}

	return (
		<button
			className={clsx(column.getIsSorted() ? 'text-black' : '')}
			data-testid={`table-sort-${column.id}`}
			onClick={column.getToggleSortingHandler()}
		>
			<ChevronTriangle direction={getDirection()} />
		</button>
	);
};

export default TableSortSalary;
