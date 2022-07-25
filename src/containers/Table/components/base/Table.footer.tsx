import { Table } from '@tanstack/react-table';
import clsx from 'clsx';

import Chevron from '@/components/icons/chevron';
import { Direction } from '@/components/icons/chevron-triangle';
import { IPlayer } from '@/containers/Players';

interface ITableFooter {
	table: Table<IPlayer>;
}

const TableFooter = ({ table }: ITableFooter) => (
	<div className="sticky bottom-0 bg-white border-t-[1px]" role="rolegroup">
		<div role="row">
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
						disabled={!table.getCanNextPage()}
						onClick={() => table.nextPage()}
					>
						<Chevron direction={Direction.Right} />
					</button>
				</div>
			</div>
		</div>

		{/* Gap at bottom of screen */}
		<div className="bg-gray-100 h-[2rem]" />
	</div>
);

export default TableFooter;
