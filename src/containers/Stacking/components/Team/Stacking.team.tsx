import FromPositions from './Stacking.team.positions';
import FromTeams from './Stacking.team.teams';
import MaxExposure from './Stacking.team.maxExposure';
import MaxExposurePerTeam from './Stacking.team.maxExposurePerTeam';
import NumberOfPlayersToStack from './Stacking.team.players';
import Spacing from './Stacking.team.spacing';

const TeamStacking = () => (
	<>
		<div>
			<NumberOfPlayersToStack />
		</div>
		<div className="mt-8">
			<FromTeams />
		</div>
		<div className="mt-8">
			<FromPositions />
		</div>
		<div className="mt-8">
			<Spacing />
		</div>
		<div className="mt-8">
			<MaxExposure />
		</div>
		<div className="mt-8">
			<MaxExposurePerTeam />
		</div>
	</>
);

export default TeamStacking;
