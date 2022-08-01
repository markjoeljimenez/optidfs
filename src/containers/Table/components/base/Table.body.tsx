import { Table } from '@tanstack/react-table';
import { forwardRef } from 'react';

import Loading from '@/components/loading/loading';
import { IPlayer } from '@/containers/Players';

import TableRow from './Table.row';

interface ITableBody {
	isFetching: boolean;
	isLoading: boolean;
	players: IPlayer[] | undefined;
	table: Table<IPlayer>;
}

// eslint-disable-next-line react/display-name
const TableBody = forwardRef<HTMLDivElement, ITableBody>(
	({ isFetching, isLoading, players, table }, ref) => {
		function renderTableBody() {
			if (isLoading || isFetching) {
				return (
					<div role="row">
						<div className="p-4 whitespace-nowrap" role="cell">
							<Loading text="Loading players. This may take a while..." />
						</div>
					</div>
				);
			}

			if (!players?.length) {
				return (
					<div role="row">
						<div className="p-4 whitespace-nowrap" role="cell">
							No players available
						</div>
					</div>
				);
			}

			return table
				.getRowModel()
				.rows.map((row) => <TableRow key={row.id} row={row} />);
		}

		return (
			<div
				ref={ref}
				data-testid="table-body"
				id="table-body"
				role="rowgroup"
			>
				{renderTableBody()}
			</div>
		);
	}
);

export default TableBody;
