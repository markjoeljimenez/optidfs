import MaxExposure from './Stacking.position.maxExposure';
import MaxExposurePerTeam from './Stacking.position.maxExposurePerTeam';
import OptionalPositions from './Stacking.position.optionalPositions';
import Positions from './Stacking.position.positions';
import PositionsForTeams from './Stacking.position.teams';

const PositionStacking = () => (
	<div className="space-y-8">
		<Positions />
		<OptionalPositions />
		<PositionsForTeams />
		<MaxExposure />
		<MaxExposurePerTeam />
	</div>
);

export default PositionStacking;
