import React, { useState, useEffect } from 'react';

import { IResponse, ILineup } from '../../interfaces/IApp';
import {
	IDraftKingsResponse,
	IDraftKingsPlayer,
} from '../../interfaces/IDraftKingsResponse';
import Tooltip from '../global/tooltip';
import Chevron from '../global/chevron';
import Modal from '../global/modal';
import { IPlayerStats } from '../../interfaces/IPlayerStats';

interface ITableProps {
	optimizedLineups?: ILineup[];
	players?: IDraftKingsPlayer[];
	setPlayers?: React.Dispatch<React.SetStateAction<IDraftKingsPlayer[]>>;
	handleSort: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	currentSort?: string | null;
	ascending: boolean;
}

const Table = ({
	optimizedLineups,
	handleSort,
	currentSort,
	ascending,
	players,
	setPlayers,
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

		const player = e.currentTarget.value;

		if (player) {
			setLoading(true);

			const response = await fetch(
				`${process.env.API}/stats?player=${player}`
			);

			const data = await response.json();

			if (data) {
				setCurrentPlayer(data);
				setLoading(false);
			}
		}
	};

	return (
		<div className="table-wrapper">
			<table className="table">
				<thead>
					<tr className="table__row table__row--header">
						<th className="table__cell">
							<span hidden>Select</span>
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
				{optimizedLineups ? (
					optimizedLineups.map((lineup, i) => (
						<React.Fragment key={i}>
							<tbody className="table__tbody">
								{lineup.players.length ? (
									lineup.players.map((player, _i) => (
										<tr
											className={`table__row ${
												player.status !== 'None'
													? `table__row--${player.status}`
													: ''
											}`}
											key={player.id}
											id={`${player.id}`}
										>
											<td className="table__cell table__cell--lock">
												<input
													className="checkbox"
													type="checkbox"
													// onChange={onLock}
													value={player.id}
													defaultChecked={
														player.isLocked
													}
												/>
											</td>
											<td className="table__cell table__cell--center">
												<span
													className={`pill ${
														player.status
															? `pill--${player.status}`
															: 'pill--active'
													}`}
												>
													{player.status === 'O'
														? 'Injured'
														: player.status === 'Q'
														? 'GTD'
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
												{player.position.name}
											</td>
											<td className="table__cell">
												{player.team}
											</td>
											<td className="table__cell text-align-right">
												{new Intl.NumberFormat(
													'en-US',
													{
														style: 'currency',
														currency: 'USD',
														minimumFractionDigits: 0,
													}
												).format(player.draft.salary)}
											</td>
											<td className="table__cell text-align-right">
												{player.points_per_contest}
											</td>
											<td className="table__cell">
												<Tooltip
													onHidden={() => {
														setCurrentTippy(null);
													}}
													handleVisiblity={
														onMoreButtonClick
													}
													visible={
														currentTippy ===
														player.id
													}
													value={player.id}
													player={`${player.first_name} ${player.last_name}`}
													setCurrentPlayer={viewStats}
												/>
											</td>
										</tr>
									))
								) : (
									<tr className="table__row">
										<td
											className="table__cell text-align-center"
											colSpan={9}
										>
											No players found
										</td>
									</tr>
								)}
							</tbody>
							<tfoot>
								<tr className="table__row table__row--total">
									<td className="table__cell" colSpan={6}>
										Total
									</td>
									<td className="table__cell text-align-right">
										{new Intl.NumberFormat('en-US', {
											style: 'currency',
											currency: 'USD',
											minimumFractionDigits: 0,
										}).format(lineup.totalSalary)}
									</td>
									<td className="table__cell text-align-right">
										{lineup.totalFppg}
									</td>
									<td className="table__cell" />
								</tr>
							</tfoot>
						</React.Fragment>
					))
				) : (
					<></>
				)}
				{/* {players && !isOptimized ? (
                    <tbody className="table__tbody">
                        {players.map(player => (
                            <tr
                                className={`table__row
								${
                                    player.isExcluded
                                        ? `table__row--excluded`
                                        : player.status !== ''
                                        ? `table__row--${player.status}`
                                        : ''
                                }
								${viewMore ? 'table__row--active' : ''}`}
                                key={player.id}
                                id={`${player.id}`}
                            >
                                <td className="table__cell">
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
                                                ? 'Injured'
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <></>
                )} */}
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
										alt={currentPlayer.DISPLAY_FIRST_LAST}
									/>
								</picture>
								<div className="stats__info">
									<h1 className="stats__name">
										{`#${currentPlayer.JERSEY} ${currentPlayer.DISPLAY_FIRST_LAST}`}
									</h1>
									<p>{`${currentPlayer.POSITION} | ${currentPlayer.TEAM_CITY} ${currentPlayer.TEAM_NAME}`}</p>
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
											<th className="table__cell">GP</th>
											<th className="table__cell">MIN</th>
											<th className="table__cell">PTS</th>
											<th className="table__cell">FGM</th>
											<th className="table__cell">FGA</th>
											<th className="table__cell">FG%</th>
											<th className="table__cell">
												FG3M
											</th>
											<th className="table__cell">
												FG3A
											</th>
											<th className="table__cell">
												FG3%
											</th>
											<th className="table__cell">FTM</th>
											<th className="table__cell">FTA</th>
											<th className="table__cell">FT%</th>
											<th className="table__cell">
												OREB
											</th>
											<th className="table__cell">
												DREB
											</th>
											<th className="table__cell">REB</th>
											<th className="table__cell">AST</th>
											<th className="table__cell">TOV</th>
											<th className="table__cell">STL</th>
											<th className="table__cell">BLK</th>

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
														{season.FG_PCT}
													</td>
													<td className="table__cell">
														{season.FG3M}
													</td>
													<td className="table__cell">
														{season.FG3A}
													</td>
													<td className="table__cell">
														{season.FG3_PCT}
													</td>
													<td className="table__cell">
														{season.FTM}
													</td>
													<td className="table__cell">
														{season.FTA}
													</td>
													<td className="table__cell">
														{season.FT_PCT}
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
	);
};

export default Table;
