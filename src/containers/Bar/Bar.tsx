import { connect } from 'react-redux';
import { useRef } from 'react';
import uniqBy from 'lodash.uniqby';

import { RULE, setRule, removeRule } from '../Rules/Rules.actions';

import Search from '../Search/Search';
import Optimize from '../Optimize/Optimize';

// import teams from '../../data/teams';
// import positions from '../../data/positions';

const BarContainer = (props: any) => {
	const playersFromSameTeamSelectRef = useRef<HTMLSelectElement>(null);
	const playersFromSameTeamInputRef = useRef<HTMLInputElement>(null);
	const numberOfSpecificPositionsSelectRef = useRef<HTMLSelectElement>(null);
	const numberOfSpecificPositionsInputRef = useRef<HTMLInputElement>(null);

	const { players, rules } = props;

	const teams = players && uniqBy(players, 'team').map(({ team }) => team);
	const positions =
		players && uniqBy(players, 'position').map(({ position }) => position);

	const handleNumberOfPlayersFromTeamClick = () => {
		if (!playersFromSameTeamSelectRef && !playersFromSameTeamInputRef) {
			return;
		}

		const team = playersFromSameTeamSelectRef.current?.value;
		const value = playersFromSameTeamInputRef.current?.value;

		if (team && value) {
			props.setRule(
				RULE.NUMBER_OF_PLAYERS_FROM_SAME_TEAM,
				team,
				parseInt(value)
			);
		}
	};

	const handleNumberOfSpecificPositionsClick = () => {
		if (
			!numberOfSpecificPositionsSelectRef &&
			!numberOfSpecificPositionsInputRef
		) {
			return;
		}

		const team = numberOfSpecificPositionsSelectRef.current?.value;
		const value = numberOfSpecificPositionsInputRef.current?.value;

		if (team && value) {
			props.setRule(
				RULE.NUMBER_OF_SPECIFIC_POSITIONS,
				team,
				parseInt(value)
			);
		}
	};

	const handleMinSalaryCapChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value } = e.currentTarget;

		props.setRule(RULE.MINIMUM_SALARY_CAP, undefined, parseInt(value));
	};

	const handleMaxRepeatingPlayers = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value } = e.currentTarget;

		props.setRule(RULE.MAX_REPEATING_PLAYERS, undefined, parseInt(value));
	};

	const handleProjectedOwnershipChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value } = e.currentTarget;

		props.setRule(RULE.PROJECTED_OWNERSHIP, undefined, parseFloat(value));
	};

	const handleRemoveRule = (e: React.MouseEvent<HTMLButtonElement>) => {
		const { value } = e.currentTarget;
		const rule = e.currentTarget.getAttribute('data-rule');

		if (!value || !rule) {
			return;
		}

		props.removeRule(rule, value);
	};

	return players ? (
		<>
			<div className="row">
				<div className="col col-md-9">
					<Search />
				</div>
				<div className="col">
					<Optimize />
				</div>
			</div>
			<div className="row">
				<div className="col">
					Rules
					<div className="input-group">
						Number of players from same team
						<div className="input input-group__input">
							<label htmlFor="team">
								<span className="u-hidden">
									Number of generations
								</span>
								<select
									ref={playersFromSameTeamSelectRef}
									id="team"
								>
									<option value="" disabled selected>
										Select team
									</option>
									{teams?.map((team, i) => (
										<option value={team} key={i}>
											{team}
										</option>
									))}
								</select>
							</label>
							<label htmlFor="numberOfPlayersPerTeam">
								<span className="u-hidden">
									Number of players
								</span>
								<input
									ref={playersFromSameTeamInputRef}
									id="numberOfPlayersPerTeam"
									placeholder="Number of players"
									type="number"
									min={0}
									max={8}
								/>
							</label>

							<button
								type="submit"
								onClick={handleNumberOfPlayersFromTeamClick}
							>
								Add
							</button>
						</div>
						{rules.NUMBER_OF_PLAYERS_FROM_SAME_TEAM &&
							rules.NUMBER_OF_PLAYERS_FROM_SAME_TEAM.map(
								({ key, value }, i) => (
									<div key={i}>
										<span>{key}</span> -{' '}
										<span>{value}</span>
										<button
											type="button"
											onClick={handleRemoveRule}
											value={key}
											data-rule={
												RULE.NUMBER_OF_PLAYERS_FROM_SAME_TEAM
											}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												width="24"
												height="24"
											>
												<g data-name="Layer 2">
													<g data-name="close">
														<rect
															width="24"
															height="24"
															transform="rotate(180 12 12)"
															opacity="0"
														/>
														<path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
													</g>
												</g>
											</svg>
										</button>
									</div>
								)
							)}
					</div>
					<div className="input-group">
						Number of specific positions
						<div className="input input-group__input">
							<label htmlFor="numberOfSpecificPositionsSelect">
								<span className="u-hidden">
									Number of specific positions
								</span>
								<select
									ref={numberOfSpecificPositionsSelectRef}
									id="numberOfSpecificPositionsSelect"
								>
									<option value="" disabled selected>
										Select position
									</option>
									{positions.map((position, i) => (
										<option value={position} key={i}>
											{position}
										</option>
									))}
								</select>
							</label>
							<label htmlFor="numberOfSpecificPositions">
								<span className="u-hidden">
									Number of players
								</span>
								<input
									ref={numberOfSpecificPositionsInputRef}
									id="numberOfSpecificPositions"
									placeholder="Number of players"
									type="number"
									min={0}
									max={3}
								/>
							</label>

							<button
								type="submit"
								onClick={handleNumberOfSpecificPositionsClick}
							>
								Add
							</button>
						</div>
						{rules.NUMBER_OF_SPECIFIC_POSITIONS &&
							rules.NUMBER_OF_SPECIFIC_POSITIONS.map(
								({ key, value }, i) => (
									<div key={i}>
										<span>{key}</span> -{' '}
										<span>{value}</span>
										<button
											type="button"
											onClick={handleRemoveRule}
											value={key}
											data-rule={
												RULE.NUMBER_OF_SPECIFIC_POSITIONS
											}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												width="24"
												height="24"
											>
												<g data-name="Layer 2">
													<g data-name="close">
														<rect
															width="24"
															height="24"
															transform="rotate(180 12 12)"
															opacity="0"
														/>
														<path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
													</g>
												</g>
											</svg>
										</button>
									</div>
								)
							)}
					</div>
					<div className="input-group">
						Minimum Salary Cap
						<div className="input input-group__input">
							<label htmlFor="minSalaryCap">
								<span className="u-hidden">
									Minimum Salary Cap
								</span>
								<input
									id="minSalaryCap"
									placeholder="Minimum salary cap"
									type="number"
									min={0}
									step={5000}
									onChange={handleMinSalaryCapChange}
								/>
							</label>
						</div>
					</div>
					<div className="input-group">
						Maximum repeating players
						<div className="input input-group__input">
							<label htmlFor="maxRepeatingPlayers">
								<span className="u-hidden">
									Maximum repeating players
								</span>
								<input
									id="maxRepeatingPlayers"
									placeholder="Maximum repeating players"
									type="number"
									min={0}
									onChange={handleMaxRepeatingPlayers}
								/>
							</label>
						</div>
					</div>
					<div className="input-group">
						Projected ownership
						<div className="input input-group__input">
							<label htmlFor="projectedOwnership">
								<span className="u-hidden">
									Projected ownership
								</span>
								<input
									id="projectedOwnership"
									placeholder="Projected ownership"
									type="number"
									min={0}
									max={1}
									step={0.1}
									onChange={handleProjectedOwnershipChange}
								/>
							</label>
						</div>
					</div>
				</div>
			</div>
		</>
	) : (
		<></>
	);
};

const mapStateToProps = (actions) => {
	console.log(actions);

	return {
		teamIds: actions.table.teamIds,
		players: actions.table.players,
		rules: actions.rules,
	};
};

const mapDispatchToProps = (dispatch) => ({
	setRule: (rule, key, value) => dispatch(setRule(rule, key, value)),
	removeRule: (rule, key) => dispatch(removeRule(rule, key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BarContainer);
