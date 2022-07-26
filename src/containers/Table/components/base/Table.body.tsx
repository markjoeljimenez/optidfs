import { Table } from '@tanstack/react-table';

import Loading from '@/components/loading/loading';
import { IPlayer } from '@/containers/Players';

import TableRow from './Table.row';

interface ITableBody {
	response: {
		isFetching: boolean;
		isLoading: boolean;
		isSuccess: boolean;
	};
	table: Table<IPlayer>;
}

const TableBody = ({ response, table }: ITableBody) => {
	function renderTableBody() {
		if (response.isLoading || response.isFetching) {
			return (
				<div role="row">
					<div className="p-4 whitespace-nowrap" role="cell">
						<Loading text="Loading players. This may take a while..." />
					</div>
				</div>
			);
		}

		// if (!data || !data.length) {
		//     return (
		//         <div role="row">
		//             <div className="p-4 whitespace-nowrap" role="cell">
		//                 No players available
		//             </div>
		//         </div>
		//     );
		// }

		return table
			.getRowModel()
			.rows.map((row) => <TableRow key={row.id} row={row} />);
	}

	return (
		<div data-testid="table-body" role="rowgroup">
			{renderTableBody()}
		</div>
	);
};

export default TableBody;
