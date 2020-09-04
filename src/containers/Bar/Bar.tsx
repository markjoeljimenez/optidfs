import { connect } from 'react-redux';
import { useRef } from 'react';
import Search from '../Search/Search';
import Optimize from '../Optimize/Optimize';
import teams from '../../data/teams';
import { SET_RULE, setRule } from './Bar.actions';

const BarContainer = (props: any) => {
	const playersFromSameTeamSelectRef = useRef<HTMLSelectElement>(null);
	const playersFromSameTeamInputRef = useRef<HTMLInputElement>(null);

	const { draftGroupId, teamIds } = props;

	const handleNumberOfPlayersFromTeamClick = () => {
		if (!playersFromSameTeamSelectRef && !playersFromSameTeamInputRef) {
			return;
		}

		const team = playersFromSameTeamSelectRef.current?.value;
		const value = playersFromSameTeamInputRef.current?.value;

		props.setRule.numberOfPlayersFromSameTeam(
			SET_RULE.NUMBER_OF_PLAYERS_FROM_SAME_TEAM,
			team,
			value
		);
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
									<option value="">Select team</option>
									{teams
										.filter((team, i) =>
											teamIds.some(
												(teamId) => i === teamId
											)
										)
										.map(({ short, name }) => (
											<option value={short} key={short}>
												{name}
											</option>
										))}
								</select>
							</label>
							<label htmlFor="numberOfPlayersPerTeam">
								<span className="u-hidden">
									Number of generations
								</span>
								<input
									ref={playersFromSameTeamInputRef}
									id="numberOfPlayersPerTeam"
									placeholder="Number of players"
									type="number"
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
	setRule: {
		numberOfPlayersFromSameTeam: (type, team, value) =>
			dispatch(setRule(type, team, value)),
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(BarContainer);
