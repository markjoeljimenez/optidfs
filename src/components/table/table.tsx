import React, { useEffect, useState, useRef } from 'react';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';

import { IResponse, ILineup } from '../../interfaces/IApp';
import {
	IDraftKingsResponse,
	IDraftKingsPlayer,
} from '../../interfaces/IDraftKingsResponse';

interface ITableProps {
	optimizedLineups?: IResponse;
	players?: IDraftKingsPlayer[];
	setPlayers?: React.Dispatch<React.SetStateAction<IDraftKingsPlayer[]>>;
}

export function Table({ optimizedLineups, players, setPlayers }: ITableProps) {
	const [viewMore, setViewMore] = useState(false);

	const onMoreButtonClick = (e: React.MouseEvent) => {
		setViewMore(!viewMore);
	};

	return (
		<div className="table-wrapper">
			<table className="table">
				<thead>
					<tr className="table__row table__row--header">
						<th className="table__cell" />
						<th className="table__cell table__cell--center">
							Status
						</th>
						<th className="table__cell">First name</th>
						<th className="table__cell">Last name</th>
						<th className="table__cell">Positions</th>
						<th className="table__cell">Team</th>
						<th className="table__cell text-align-right">Salary</th>
						<th className="table__cell text-align-right">FPPG</th>
						<th className="table__cell" />
					</tr>
				</thead>
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
                                    <Manager>
                                        <Reference>
                                            {({ ref }) => (
                                                <button
                                                    type="button"
                                                    ref={ref}
                                                    className="table__button"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                        height="24"
                                                    >
                                                        <g data-name="Layer 2">
                                                            <g data-name="more-vertical">
                                                                <rect
                                                                    width="24"
                                                                    height="24"
                                                                    transform="rotate(-90 12 12)"
                                                                    opacity="0"
                                                                />
                                                                <circle
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="2"
                                                                />
                                                                <circle
                                                                    cx="12"
                                                                    cy="5"
                                                                    r="2"
                                                                />
                                                                <circle
                                                                    cx="12"
                                                                    cy="19"
                                                                    r="2"
                                                                />
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </button>
                                            )}
                                        </Reference>
                                        <Popper placement="right">
                                            {({
                                                ref,
                                                arrowProps,
                                                placement,
                                            }) => (
                                                <div
                                                    ref={ref}
                                                    // style={style}
                                                    data-placement={placement}
                                                >
                                                    Popper element
                                                    <div
                                                        ref={arrowProps.ref}
                                                        style={arrowProps.style}
                                                    />
                                                </div>
                                            )}
                                        </Popper>
                                    </Manager>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <></>
                )} */}

				{optimizedLineups ? (
					optimizedLineups.lineups.map((lineup, i) => (
						<React.Fragment key={i}>
							<tbody className="table__tbody" key={i}>
								{lineup.players.map((player, i) => (
									<tr
										className={`table__row ${
											player.isExcluded
												? 'table__row--excluded'
												: player.status &&
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
												defaultChecked={player.isLocked}
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
											{player.position.name}
										</td>
										<td className="table__cell">
											{player.team}
										</td>
										<td className="table__cell text-align-right">
											{new Intl.NumberFormat('en-US', {
												style: 'currency',
												currency: 'USD',
												minimumFractionDigits: 0,
											}).format(player.draft.salary)}
										</td>
										<td className="table__cell text-align-right">
											{player.points_per_contest}
										</td>
										<td className="table__cell">
											<Tippy
												content={<span>Tooltip</span>}
												visible={viewMore}
											>
												<button
													type="button"
													className="table__button"
													onClick={onMoreButtonClick}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														width="24"
														height="24"
													>
														<g data-name="Layer 2">
															<g data-name="more-vertical">
																<rect
																	width="24"
																	height="24"
																	transform="rotate(-90 12 12)"
																	opacity="0"
																/>
																<circle
																	cx="12"
																	cy="12"
																	r="2"
																/>
																<circle
																	cx="12"
																	cy="5"
																	r="2"
																/>
																<circle
																	cx="12"
																	cy="19"
																	r="2"
																/>
															</g>
														</g>
													</svg>
												</button>
											</Tippy>
										</td>
									</tr>
								))}
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
			</table>
		</div>
	);
}
