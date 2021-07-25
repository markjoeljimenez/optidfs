import { useState } from 'react';
import { useAppSelector } from '../../hooks';

import Error from '../Error/Error.component';
import Loading from '../../components/loading/loading';

import Footer from './components/Table.footer';
import PlayerRow from './components/Table.player';

const Table = () => {
	const { loading, view } = useAppSelector((state) => state.table);
	const { error, players } = useAppSelector((state) => state);

	const [activeRow, setActiveRow] = useState<number>();

	function handleOptionsClick(e: React.MouseEvent<HTMLButtonElement>) {
		const { value } = e.currentTarget;

		setActiveRow(
			activeRow === parseInt(value) ? undefined : parseInt(value)
		);
	}

	return players.all || players.optimized ? (
		<Loading loading={loading} message="Loading players...">
			<div role="table">
				<div
					className="border-b border-gray-200 md:block hidden"
					role="rowgroup"
				>
					<div
						className="grid grid-cols-table-md text-xs uppercase font-black container mx-auto px-8 bg-gray-50"
						role="row"
					>
						<div
							className="md:p-2 md:py-4 pl-0 flex align"
							role="columnheader"
						>
							Lock / exclude
						</div>
						{/* <div
							className="p-2 flex items-center justify-center"
							role="columnheader"
						>
							Status
						</div> */}
						<div
							className="p-2 flex items-center"
							role="columnheader"
						>
							First name
						</div>
						<div
							className="p-2 flex items-center"
							role="columnheader"
						>
							Last name
						</div>
						<div
							className="p-2 flex items-center"
							role="columnheader"
						>
							Positions
						</div>
						<div
							className="p-2 flex items-center"
							role="columnheader"
						>
							Team
						</div>
						<div
							className="p-2 flex items-center justify-end"
							role="columnheader"
						>
							Salary
						</div>
						<div
							className="p-2 flex items-center justify-end"
							role="columnheader"
						>
							FPPG
						</div>
						<div className="p-2" role="columnheader">
							<span hidden>Options</span>
						</div>
					</div>
				</div>
				<div role="rowgroup">
					{players?.searched?.length
						? players?.searched?.map((player, i) => (
								<PlayerRow
									player={player}
									i={i}
									handleOptionsClick={handleOptionsClick}
									activeRow={activeRow}
									key={player.id}
								/>
						  ))
						: players?.[view]?.map((player, i) => (
								<PlayerRow
									player={player}
									i={i}
									handleOptionsClick={handleOptionsClick}
									activeRow={activeRow}
									key={player.id}
								/>
						  ))}
				</div>

				<Footer />
			</div>
		</Loading>
	) : error.display ? (
		<div className="container mx-auto py-4">
			<Error />
		</div>
	) : (
		<></>
	);
};

export default Table;
