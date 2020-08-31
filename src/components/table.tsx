import React, { useState } from 'react';

import { IDraftKingsPlayer } from '../interfaces/IDraftKingsResponse';
import { ITotals } from '../pages/index.old';
import { IPlayerStats } from '../interfaces/IPlayerStats';

import Chevron from './global/chevron';
import Modal from './global/modal';
import Loading from './loading';

interface ITableProps {
	ascending: boolean;
	currentSort?: string | null;
	handleSort: (e: React.MouseEvent<HTMLButtonElement>) => void;
	players?: IDraftKingsPlayer[];
	totals?: ITotals;
	lineupLength?: number;
	handlePagination?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	pagination?: number;
	loading: boolean;
}

const Table = ({
	ascending,
	currentSort,
	handleSort,
	players,
	totals,
	lineupLength,
	handlePagination,
	pagination,
	loading,
}: ITableProps) => {
	const [currentTippy, setCurrentTippy] = useState<string | null>(null);
	const [currentPlayer, setCurrentPlayer] = useState<IPlayerStats | null>(
		null
	);
	const [modal, setModal] = useState(false);
	const [isLoading, setLoading] = useState(false);

	const onMoreButtonClick = (e: React.MouseEvent) => {
		if (e.currentTarget instanceof HTMLButtonElement) {
			const { value } = e.currentTarget;

			setCurrentTippy(currentTippy === value ? null : value);
		}
	};

	const viewStats = async (e: React.MouseEvent<HTMLButtonElement>) => {
		setModal(!modal);

		const { value } = e.currentTarget;

		if (value) {
			setLoading(true);

			const response = await fetch(
				`${process.env.ENDPOINT}/stats?player=${value}`
			);

			const data = await response.json();

			if (data) {
				setCurrentPlayer(data);
				setLoading(false);
			}
		}
	};

	return (
		<Loading loading={loading}>
			<div className="table-wrapper">
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
									onClick={handleSort}
									className="table__link"
									type="button"
									data-sort="draft.salary"
								>
									Salary
									{currentSort === 'draft.salary' ? (
										<Chevron active={ascending} />
									) : (
										<></>
									)}
								</button>
							</th>
							<th className="table__cell text-align-right">
								<button
									onClick={handleSort}
									className="table__link"
									type="button"
									data-sort="points_per_contest"
								>
									FPPG
									{currentSort === 'points_per_contest' ? (
										<Chevron active={ascending} />
									) : (
										<></>
									)}
								</button>
							</th>
							<th className="table__cell">
								<span hidden>Options</span>
							</th>
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
								<td className="table__cell">
									<button
										className="table__link table__stats"
										type="button"
										value={`${player.first_name} ${player.last_name}`}
										onClick={viewStats}
									>
										Stats
									</button>
								</td>
							</tr>
						))}
					</tbody>

					{totals && (
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
									}).format(totals.totalSalary)}
								</td>
								<td className="table__cell text-align-right">
									{totals.totalFppg}
								</td>
								<td className="table__cell" />
							</tr>
							{lineupLength && lineupLength > 1 ? (
								<tr className="table__row table__row--total table__row--pagination">
									<td className="table__cell">
										{pagination !== 1 ? (
											<button
												type="button"
												onClick={handlePagination}
												value={-1}
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
										) : (
											<></>
										)}
									</td>
									<td
										className="table__cell text-align-center"
										colSpan={6}
									>
										{`${pagination} of ${lineupLength} generated lineups`}
									</td>
									<td className="table__cell">
										{pagination !== lineupLength ? (
											<button
												type="button"
												onClick={handlePagination}
												value={1}
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
										) : (
											<></>
										)}
									</td>
								</tr>
							) : (
								<></>
							)}
						</tfoot>
					)}
				</table>

				{modal && currentPlayer ? (
					<Modal openModal={viewStats}>
						{!isLoading ? (
							<div className="stats">
								<div className="stats__header">
									<picture className="stats__picture">
										<img
											className="stats__image"
											src={currentPlayer.profile_picture}
											alt={
												currentPlayer.DISPLAY_FIRST_LAST
											}
										/>
									</picture>
									<div className="stats__info">
										<h1 className="stats__name">
											{`#${currentPlayer.JERSEY} ${currentPlayer.DISPLAY_FIRST_LAST}`}
										</h1>
										<p>{`${currentPlayer.POSITION} | ${currentPlayer.TEAM_CITY} ${currentPlayer.TEAM_NAME}`}</p>
										<p>
											{`${currentPlayer.PTS} PTS, ${currentPlayer.AST} AST, ${currentPlayer.REB} REB`}
										</p>
									</div>
								</div>
								<div className="stats__content">
									<table className="stats__table table">
										<thead>
											<tr className="table__row table__row--header">
												<th className="table__cell  text-align-left">
													BY YEAR
												</th>
												<th className="table__cell  text-align-left">
													TEAM
												</th>
												<th className="table__cell">
													GP
												</th>
												<th className="table__cell">
													MIN
												</th>
												<th className="table__cell">
													PTS
												</th>
												<th className="table__cell">
													FGM
												</th>
												<th className="table__cell">
													FGA
												</th>
												<th className="table__cell">
													FG%
												</th>
												<th className="table__cell">
													FG3M
												</th>
												<th className="table__cell">
													FG3A
												</th>
												<th className="table__cell">
													FG3%
												</th>
												<th className="table__cell">
													FTM
												</th>
												<th className="table__cell">
													FTA
												</th>
												<th className="table__cell">
													FT%
												</th>
												<th className="table__cell">
													OREB
												</th>
												<th className="table__cell">
													DREB
												</th>
												<th className="table__cell">
													REB
												</th>
												<th className="table__cell">
													AST
												</th>
												<th className="table__cell">
													TOV
												</th>
												<th className="table__cell">
													STL
												</th>
												<th className="table__cell">
													BLK
												</th>

												{/* <td>GS</td>
											<td>LEAGUE_ID</td>
											<td>PLAYER_AGE</td>
											<td>PLAYER_ID</td>
											<td>EFF</td>
											<td>TEAM_ID</td> */}
											</tr>
										</thead>
										<tbody>
											{currentPlayer.SeasonTotalsRegularSeason.map(
												(season, i) => (
													<tr
														className="table__row"
														key={i}
													>
														<td className="table__cell text-align-left">
															{season.SEASON_ID}
														</td>
														<td className="table__cell text-align-left">
															{
																season.TEAM_ABBREVIATION
															}
														</td>
														<td className="table__cell">
															{season.GP}
														</td>
														<td className="table__cell">
															{season.MIN}
														</td>
														<td className="table__cell">
															{season.PTS}
														</td>
														<td className="table__cell">
															{season.FGM}
														</td>
														<td className="table__cell">
															{season.FGA}
														</td>
														<td className="table__cell">
															{(
																season.FG_PCT *
																100
															).toFixed(1)}
														</td>
														<td className="table__cell">
															{season.FG3M}
														</td>
														<td className="table__cell">
															{season.FG3A}
														</td>
														<td className="table__cell">
															{(
																season.FG3_PCT *
																100
															).toFixed(1)}
														</td>
														<td className="table__cell">
															{season.FTM}
														</td>
														<td className="table__cell">
															{season.FTA}
														</td>
														<td className="table__cell">
															{(
																season.FT_PCT *
																100
															).toFixed(1)}
														</td>
														<td className="table__cell">
															{season.OREB}
														</td>
														<td className="table__cell">
															{season.DREB}
														</td>
														<td className="table__cell">
															{season.REB}
														</td>
														<td className="table__cell">
															{season.AST}
														</td>
														<td className="table__cell">
															{season.TOV}
														</td>
														<td className="table__cell">
															{season.STL}
														</td>
														<td className="table__cell">
															{season.BLK}
														</td>
													</tr>
												)
											).reverse()}
										</tbody>
									</table>
								</div>
							</div>
						) : (
							<>Loading...</>
						)}
					</Modal>
				) : (
					<></>
				)}
			</div>
		</Loading>
	);
};

export default Table;
