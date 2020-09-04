import { connect } from 'react-redux';
import { useRef } from 'react';

import { RULE, setRule } from '../Rules/Rules.actions';

import Search from '../Search/Search';
import Optimize from '../Optimize/Optimize';

import teams from '../../data/teams';
import positions from '../../data/positions';

const BarContainer = (props: any) => {
	const playersFromSameTeamSelectRef = useRef<HTMLSelectElement>(null);
	const playersFromSameTeamInputRef = useRef<HTMLInputElement>(null);
	const numberOfSpecificPositionsSelectRef = useRef<HTMLSelectElement>(null);
	const numberOfSpecificPositionsInputRef = useRef<HTMLInputElement>(null);

	const { draftGroupId, teamIds } = props;

	const handleNumberOfPlayersFromTeamClick = () => {
		if (!playersFromSameTeamSelectRef && !playersFromSameTeamInputRef) {
			return;
		}

		const team = playersFromSameTeamSelectRef.current?.value;
		const value = playersFromSameTeamInputRef.current?.value;

		props.setRule(RULE.NUMBER_OF_PLAYERS_FROM_SAME_TEAM, team, value);
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

		props.setRule(RULE.NUMBER_OF_SPECIFIC_POSITIONS, team, value);
	};

	const handleMinSalaryCapChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value } = e.currentTarget;

		props.setRule(RULE.MINIMUM_SALARY_CAP, undefined, value);
	};

	const handleMaxRepeatingPlayers = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value } = e.currentTarget;

		props.setRule(RULE.MAX_REPEATING_PLAYERS, undefined, value);
	};

	return draftGroupId ? (
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
									{teams.NBA.filter((team, i) =>
										teamIds.some((teamId) => i === teamId)
									).map(({ short, name }) => (
										<option value={short} key={short}>
											{name}
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
									{positions.NBA.map(({ short, name }) => (
										<option value={short} key={short}>
											{name}
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
				</div>
			</div>
		</>
	) : (
		<></>
	);
};

const mapStateToProps = ({ table }) => ({
	draftGroupId: table.draftGroupId,
	teamIds: table.teamIds,
});

const mapDispatchToProps = (dispatch) => ({
	setRule: (type, key, value) => dispatch(setRule(type, key, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BarContainer);
