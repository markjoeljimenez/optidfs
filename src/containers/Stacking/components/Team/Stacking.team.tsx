import NumberOfPlayersToStack from './Stacking.team.players';
import FromTeams from './Stacking.team.teams';
import FromPositions from './Stacking.team.positions';
import Spacing from './Stacking.team.spacing';
import MaxExposure from './Stacking.team.maxExposure';
import MaxExposurePerTeam from './Stacking.team.maxExposurePerTeam';

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
