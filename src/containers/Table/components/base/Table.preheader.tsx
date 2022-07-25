import { ChangeEvent } from 'react';

interface ITablePreheader {
	onGlobalSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TablePreheader = ({ onGlobalSearch }: ITablePreheader) => (
	<div role="rowgroup">
		<div role="row">
			<div className="p-4 whitespace-nowrap" role="cell">
				<input
					placeholder="Search by player, team, or position"
					type="text"
					onChange={onGlobalSearch}
				/>
			</div>
		</div>
	</div>
);

export default TablePreheader;
