import { ChangeEvent } from 'react';

import Input from '@/components/form/input';
import Search from '@/components/icons/search';

import TableView from '../Table.view';

interface ITablePreheader {
	onGlobalSearch: (e: ChangeEvent<HTMLInputElement>) => void;
	value?: string;
}

const TablePreheader = ({ onGlobalSearch, value }: ITablePreheader) => (
	<div className="bg-white" role="rowgroup">
		<div role="row">
			<div
				className="p-4 whitespace-nowrap flex justify-between items-center"
				role="cell"
			>
				<TableView />
				<Input
					className="border-0 rounded-none p-0 min-w-[15rem] mt-0"
					icon={<Search />}
					id="table-search"
					placeholder="Search by player, team, or position"
					testid="table-search"
					type="text"
					value={value ?? ''}
					onChange={onGlobalSearch}
				/>
			</div>
		</div>
	</div>
);

export default TablePreheader;
