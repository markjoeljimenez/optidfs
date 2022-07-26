import { Table } from '@tanstack/react-table';
import clsx from 'clsx';

import Chevron from '@/components/icons/chevron';
import { Direction } from '@/components/icons/chevron-triangle';
import { IPlayer } from '@/containers/Players';

interface ITablePagination {
	table: Table<IPlayer>;
}
const TableFooterPagination = ({ table }: ITablePagination) => (
	<div className=" border-t-[1px]" role="row">
		<div className="p-4 whitespace-nowrap flex justify-end" role="cell">
			<span>
				Page{' '}
				<strong>
					{table.getState().pagination.pageIndex + 1} of{' '}
					{table.getPageCount()}
				</strong>
			</span>
			<span className="ml-4">|</span>
			<div className="inline-block ml-4">
				<button
					className={clsx(
						'h-5 w-5',
						!table.getCanPreviousPage() && 'text-gray-300'
					)}
					data-testid="pagination-previous-page"
					disabled={!table.getCanPreviousPage()}
					onClick={() => table.previousPage()}
				>
					<Chevron direction={Direction.Left} />
				</button>
				<button
					className={clsx(
						'h-5 w-5',
						!table.getCanNextPage() && 'text-gray-300'
					)}
					data-testid="pagination-next-page"
					disabled={!table.getCanNextPage()}
					onClick={() => table.nextPage()}
				>
					<Chevron direction={Direction.Right} />
				</button>
			</div>
		</div>
	</div>
);

export default TableFooterPagination;
