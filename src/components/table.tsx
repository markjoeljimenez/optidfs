import { IDraftKingsPlayer } from '../interfaces/IDraftKingsResponse';

interface ITable {
	lineups?: IDraftKingsPlayer[];
	lockedPlayers?: IDraftKingsPlayer[];
	players?: IDraftKingsPlayer[];
	totalSalary?: number;
	totalFppg?: number;
	page: number;
	previous: () => void;
	next: () => void;
	lock: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Table = ({
	lineups,
	lockedPlayers,
	players,
	totalSalary,
	totalFppg,
	page,
	previous,
	next,
	lock,
}: ITable) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		lock(e);
	};

	return (
		<div className="table">
			<table>
				<thead>
					<tr className="table__row table__row--header">
						<th className="table__cell table__cell--center">
							<span hidden>Select</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="24"
								height="24"
							>
								<g data-name="Layer 2">
									<g data-name="lock">
										<rect
											width="24"
											height="24"
											opacity="0"
										/>
										<path d="M17 8h-1V6.11a4 4 0 1 0-8 0V8H7a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3zm-7-1.89A2.06 2.06 0 0 1 12 4a2.06 2.06 0 0 1 2 2.11V8h-4zM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1z" />
										<path d="M12 12a3 3 0 1 0 3 3 3 3 0 0 0-3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1z" />
									</g>
								</g>
							</svg>
						</th>
						<th className="table__cell table__cell--center">
							Status
						</th>
						<th className="table__cell">First name</th>
						<th className="table__cell">Last name</th>
						<th className="table__cell">Positions</th>
						<th className="table__cell">Team</th>
						<th className="table__cell text-align-right">
							<button
								// onClick={handleSort}
								className="table__link"
								type="button"
								data-sort="draft.salary"
							>
								Salary
								{/* {currentSort === 'draft.salary' ? (
								<Chevron active={ascending} />
							) : (
								<></>
							)} */}
							</button>
						</th>
						<th className="table__cell text-align-right">
							<button
								// onClick={handleSort}
								className="table__link"
								type="button"
								data-sort="points_per_contest"
							>
								FPPG
								{/* {currentSort === 'points_per_contest' ? (
								<Chevron active={ascending} />
							) : (
								<></>
							)} */}
							</button>
						</th>
						{/* <th className="table__cell">
						<span hidden>Options</span>
					</th> */}
					</tr>
				</thead>
				<tbody className="table__tbody">
					{players?.map((player) => (
						<tr className="table__row" key={player.id}>
							<td className="table__cell table__cell--center">
								{player.status !== 'O' ? (
									<input
										className="checkbox"
										type="checkbox"
										onChange={handleChange}
										defaultChecked={lockedPlayers?.some(
											(_player) =>
												_player.id === player.id
										)}
										value={player.id}
									/>
								) : (
									<></>
								)}
							</td>
							<td className="table__cell table__cell--center">
								<span
									className={`pill ${
										player.status
											? `pill--${player.status}`
											: 'pill--active'
									}`}
								>
									{player.status
										? player.status === 'O'
											? 'Out'
											: player.status === 'Q'
											? 'GTD'
											: player.status
										: 'Active'}
								</span>
							</td>
							<td className="table__cell">{player.first_name}</td>
							<td className="table__cell">{player.last_name}</td>
							<td className="table__cell">{player.position}</td>
							<td className="table__cell">{player.team}</td>
							<td className="table__cell text-align-right">
								{new Intl.NumberFormat('en-US', {
									style: 'currency',
									currency: 'USD',
									minimumFractionDigits: 0,
								}).format(player.salary)}
							</td>
							<td className="table__cell text-align-right">
								{player.points_per_contest}
							</td>
							{/* <td className="table__cell">
							<button
								className="table__link table__stats"
								type="button"
								value={`${player.first_name} ${player.last_name}`}
								// onClick={viewStats}
							>
								Stats
							</button>
						</td> */}
						</tr>
					))}
				</tbody>

				{lineups && (
					<tfoot>
						<tr className="table__row table__row--total">
							<td className="table__cell" colSpan={6}>
								Total
							</td>
							<td className="table__cell text-align-right">
								{totalSalary &&
									new Intl.NumberFormat('en-US', {
										style: 'currency',
										currency: 'USD',
										minimumFractionDigits: 0,
									}).format(totalSalary)}
							</td>
							<td className="table__cell text-align-right">
								{totalFppg}
							</td>
							{/* <td className="table__cell" /> */}
						</tr>
						{lineups.length > 1 && (
							<tr className="table__row table__row--total table__row--pagination">
								<td className="table__cell">
									<button
										type="button"
										onClick={() => previous()}
									>
										Previous
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="24"
											height="24"
										>
											<g data-name="Layer 2">
												<g data-name="arrow-ios-back">
													<rect
														width="24"
														height="24"
														transform="rotate(90 12 12)"
														opacity="0"
													/>
													<path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z" />
												</g>
											</g>
										</svg>
									</button>
								</td>
								<td
									className="table__cell text-align-center"
									colSpan={6}
								>
									{`${page + 1} of ${
										lineups.length
									} generated lineups`}
								</td>
								<td className="table__cell">
									<button
										type="button"
										onClick={() => next()}
									>
										Next
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="24"
											height="24"
										>
											<g data-name="Layer 2">
												<g data-name="arrow-ios-forward">
													<rect
														width="24"
														height="24"
														transform="rotate(-90 12 12)"
														opacity="0"
													/>
													<path d="M10 19a1 1 0 0 1-.64-.23 1 1 0 0 1-.13-1.41L13.71 12 9.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z" />
												</g>
											</g>
										</svg>
									</button>
								</td>
							</tr>
						)}
					</tfoot>
				)}
			</table>
		</div>
	);
};

export default Table;
