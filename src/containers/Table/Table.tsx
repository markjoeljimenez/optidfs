import { connect } from 'react-redux';
import Loading from '../../components/loading';

const Table = ({ players, lineups, loading }: any) =>
	players?.length ? (
		<Loading loading={loading}>
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
			</table>
		</Loading>
	) : (
		<></>
	);

const mapStateToProps = ({ table }) => ({
	players: table.players,
	loading: table.loading,
	lineups: table.lineups,
});

// const mapDispatchToProps = (dispatch) => ({
// 	getPlayers: (id) => dispatch(getPlayers(id)),
// });

export default connect(mapStateToProps)(Table);
