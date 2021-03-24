import MaxExposure from './Stacking.position.maxExposure';
import MaxExposurePerTeam from './Stacking.position.maxExposurePerTeam';
import OptionalPositions from './Stacking.position.optionalPositions';
import Positions from './Stacking.position.positions';
import PositionsForTeams from './Stacking.position.teams';

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
