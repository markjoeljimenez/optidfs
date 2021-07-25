import { useAppDispatch, useAppSelector } from '../../../hooks';

import {
	setPlayerExposure,
	setProjectedOwnership,
} from '../../Players/Players.actions';

import { IDraftKingsPlayer } from '../../../interfaces/IDraftKingsResponse';

import Toggle from './Table.lockExclude';

interface IPlayerRow {
	i: number;
	activeRow?: number;
	player: IDraftKingsPlayer;
	handleOptionsClick(e: React.MouseEvent<HTMLButtonElement>): void;
}

const PlayerRow = ({
	player,
	i,
	activeRow,
	handleOptionsClick,
}: IPlayerRow) => {
	const dispatch = useAppDispatch();
	const { contests } = useAppSelector((state) => state);

	function handleExposureChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { value } = e.currentTarget;
		const id = e.currentTarget.getAttribute('data-player-id');

		if (id) {
			dispatch(setPlayerExposure(id, parseFloat(value)));
		}
	}

	function handleProjectedOwnershipChange(
		e: React.ChangeEvent<HTMLInputElement>
	) {
		const { value } = e.currentTarget;
		const id = e.currentTarget.getAttribute('data-player-id');

		if (id) {
			dispatch(setProjectedOwnership(id, parseFloat(value)));
		}
	}

	return (
		<div role="row" aria-rowindex={i}>
			<div className="border-b border-gray-300" role="rowgroup">
				<div
					className="py-4 px-8 grid grid-cols-table-sm md:grid-cols-table-md grid-rows-3 md:grid-rows-1 container mx-auto md:py-0 relative"
					role="row"
					key={Math.random()}
					// aria-rowindex={i}
				>
					<div
						className="md:p-2 md:py-4 pl-0 md:flex items-center col-start-1 md:col-start-auto hidden"
						role="cell"
					>
						<Toggle id={player.id} />
					</div>

					{/* Status */}
					{/* <div
										className="md:p-2 md:py-4 flex items-center justify-start md:justify-center"
										role="cell"
									>
										<div
											className={clsx([
												'px-2 py-1 md:px-3 md:py-2 inline rounded font-black',
												player.status
													? [
															player.status ===
															'O'
																? 'text-red-800 bg-red-300'
																: '',
															player.status ===
															'Q'
																? 'text-orange-800 bg-orange-300'
																: '',
													  ]
													: 'text-green-800 bg-green-300',
											])}
										>
											{player.status
												? player.status === 'O'
													? 'Out'
													: player.status === 'Q'
													? 'GTD'
													: player.status
												: 'Active'}
										</div>
									</div> */}

					{/* First name */}
					<div
						className="md:p-2 md:py-4 flex items-center font-black md:font-normal"
						role="cell"
					>
						<div>
							{player.first_name}
							<span className="ml-1 md:hidden">
								{player.last_name}
							</span>
						</div>
					</div>

					{/* Last name */}
					<div
						className="md:p-2 md:py-4 items-center md:flex hidden"
						role="cell"
					>
						{player.last_name}
					</div>

					{/* Positions */}
					<div
						className="md:p-2 md:py-4 flex items-center row-start-2 col-start-2 md:row-start-auto md:col-start-auto"
						role="cell"
					>
						{contests.gameType === 'Showdown Captain Mode'
							? player.draft_positions
							: player.position}
					</div>

					{/* Team */}
					<div
						className="md:p-2 md:py-4 flex items-center row-start-3 col-start-2 md:row-start-auto md:col-start-auto"
						role="cell"
					>
						{player.team}
					</div>

					{/* Salary */}
					<div
						className="md:p-2 md:py-4 flex items-center justify-end row-start-3 col-start-3 md:row-start-auto md:col-start-auto"
						role="cell"
					>
						{' '}
						{new Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'USD',
							minimumFractionDigits: 0,
						}).format(player.salary)}
					</div>

					{/* Fantasy points per game */}
					<div
						className="md:p-2 md:py-4 flex items-center justify-end row-start-2 col-start-3 md:row-start-auto md:col-start-auto"
						role="cell"
					>
						{player.points_per_contest}
					</div>

					{/* More options */}
					<div
						className="md:p-2 md:py-4 pr-0 flex justify-end items-center row-start-1 col-start-4 md:row-start-auto md:col-start-auto"
						role="cell"
					>
						<button
							type="button"
							onClick={handleOptionsClick}
							value={i}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="24"
								height="24"
							>
								<g data-name="Layer 2" fill="#013262">
									<g data-name="more-vertical">
										<rect
											width="24"
											height="24"
											transform="rotate(-90 12 12)"
											opacity="0"
										/>
										<circle cx="12" cy="12" r="2" />
										<circle cx="12" cy="5" r="2" />
										<circle cx="12" cy="19" r="2" />
									</g>
								</g>
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* More options content row */}
			{i === activeRow ? (
				<div role="rowgroup">
					<div
						className="border-b border-gray-300"
						role="row"
						key={Math.random()}
						// aria-rowindex={i}
					>
						<div
							className="container mx-auto px-8 py-4 flex"
							role="cell"
						>
							<div className="w-1/4">
								<span className="text-xs uppercase font-black mb-2 block">
									Minimum exposure
								</span>
								<div>
									<label
										htmlFor={`set-exposure-${player.id}`}
									>
										<span className="sr-only">
											Minimum exposure
										</span>
										<input
											className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											id={`set-exposure-${player.id}`}
											type="number"
											min={0.1}
											max={1}
											step={0.1}
											defaultValue={player.min_exposure}
											data-player-id={player.id}
											onChange={handleExposureChange}
										/>
									</label>
								</div>
							</div>
							<div className="w-1/4 ml-8">
								<span className="text-xs uppercase font-black mb-2 block">
									Projected Ownership
								</span>
								<div>
									<label
										htmlFor={`set-ownership-projection-${player.id}`}
									>
										<span className="sr-only">
											Projected Ownership
										</span>
										<input
											className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											id={`set-ownership-projection-${player.id}`}
											type="number"
											min={0.1}
											max={1}
											step={0.1}
											defaultValue={
												player.projected_ownership
											}
											data-player-id={player.id}
											onChange={
												handleProjectedOwnershipChange
											}
										/>
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default PlayerRow;
