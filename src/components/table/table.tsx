import React, { useState, useEffect } from 'react';

import { IResponse, ILineup } from '../../interfaces/IApp';
import {
	IDraftKingsResponse,
	IDraftKingsPlayer,
} from '../../interfaces/IDraftKingsResponse';
import Tooltip from '../global/tooltip';
import Chevron from '../global/chevron';

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

	const onMoreButtonClick = (e: React.MouseEvent) => {
		if (e.currentTarget instanceof HTMLButtonElement) {
			const { value } = e.currentTarget;

			setCurrentTippy(currentTippy === value ? null : value);
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
		</div>
	);
};

export default Table;
