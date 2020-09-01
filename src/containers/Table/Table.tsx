import { connect } from 'react-redux';
import Loading from '../../components/loading';
import { nextPage, previousPage } from './Table.actions';

const Table = ({
	players,
	loading,
	lineups,
	page,
	totalFppg,
	totalSalary,
	next,
	previous,
}: any) =>
	players?.length ? (
		<Loading loading={loading}>
			<div style={{ overflow: 'scroll' }}>
				<table className="table">
					<thead>
						<tr className="table__row table__row--header">
							{/* <th className="table__cell">
								<span hidden>Select</span>
							</th> */}
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
							<tr
								className="table__row"
								key={player.id}
								id={`${player.id}`}
							>
								{/* <td className="table__cell">
									{player.status !== 'O' ? (
										<input
											className="checkbox"
											type="checkbox"
											// onChange={onLock}
											defaultChecked={player.isLocked}
										/>
									) : (
										<></>
									)}
								</td> */}
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
								<td className="table__cell">
									{player.first_name}
								</td>
								<td className="table__cell">
									{player.last_name}
								</td>
								<td className="table__cell">
									{player.position}
								</td>
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
								<td className="table__cell" colSpan={5}>
									Total
								</td>
								<td className="table__cell text-align-right">
									{new Intl.NumberFormat('en-US', {
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
										colSpan={5}
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
		</Loading>
	) : (
		<></>
	);

const mapStateToProps = ({ table }) => ({
	players: table.players,
	loading: table.loading,
	lineups: table.lineups,
	page: table.page,
	totalFppg: table.totalFppg,
	totalSalary: table.totalSalary,
});

const mapDispatchToProps = (dispatch) => ({
	next: () => dispatch(nextPage()),
	previous: () => dispatch(previousPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
