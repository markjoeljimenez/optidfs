import FromPositions from './Stacking.team.positions';
import FromTeams from './Stacking.team.teams';
import MaxExposure from './Stacking.team.maxExposure';
import MaxExposurePerTeam from './Stacking.team.maxExposurePerTeam';
import NumberOfPlayersToStack from './Stacking.team.players';
import Spacing from './Stacking.team.spacing';

const TeamStacking = () => (
	<div className="space-y-8">
		<NumberOfPlayersToStack />
		<FromTeams />
		<FromPositions />
		<Spacing />
		<MaxExposure />
		<MaxExposurePerTeam />
	</div>
);

export default TeamStacking;
