import { useAppSelector } from '../../hooks';

import MaximumRepeatingSalaries from './components/Rules.maxRepeatingPlayers';
import MinimumSalary from './components/Rules.minimumSalary';
import NumberOfGenerations from './components/Rules.numberOfGenerations';
import NumberOfSpecificPositions from './components/Rules.numberOfSpecificPositions';
import PlayersFromSameTeam from './components/Rules.playersFromSameTeam';
import ProjectedOwnship from './components/Rules.projectedOwnership';

const Rules = () => {
	const { players } = useAppSelector((state) => state);

	return players.all ? (
		<div className="p-8 flex flex-col md:flex-row">
			<div className="flex-1 space-y-8">
				<NumberOfGenerations />
				<PlayersFromSameTeam />
				<NumberOfSpecificPositions />
			</div>
			<div className="flex-1 space-y-8 md:ml-8">
				<MinimumSalary />
				<MaximumRepeatingSalaries />
				<ProjectedOwnship />
			</div>
		</div>
	) : (
		<></>
	);
};

export default Rules;
