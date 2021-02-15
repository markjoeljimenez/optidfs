import Positions from './Stacking.position.positions';
import OptionalPositions from './Stacking.position.optionalPositions';
import PositionsForTeams from './Stacking.position.teams';
import MaxExposure from './Stacking.position.maxExposure';
import MaxExposurePerTeam from './Stacking.position.maxExposurePerTeam';

const PositionStacking = () => (
	<>
		<div>
			<Positions />
		</div>
		<div className="mt-8">
			<OptionalPositions />
		</div>
		<div className="mt-8">
			<PositionsForTeams />
		</div>
		<div className="mt-8">
			<MaxExposure />
		</div>
		<div className="mt-8">
			<MaxExposurePerTeam />
		</div>
	</>
);

export default PositionStacking;
