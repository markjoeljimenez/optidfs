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
		// <form name="rules" ref={ref} onSubmit={(e) => e.preventDefault()}>
		<div className="container mx-auto px-8 my-8 flex flex-col md:flex-row">
			<div className="flex-1">
				<div>
					<NumberOfGenerations />
				</div>
				<div className="mt-8">
					<PlayersFromSameTeam />
				</div>
				{/* <div className="mt-8">
					<PlayersFromSameTeam />
				</div> */}
				<div className="mt-8">
					<NumberOfSpecificPositions />
				</div>
			</div>
			<div className="flex-1 md:ml-8">
				<div className="mt-8 md:mt-0">
					<MinimumSalary />
				</div>
				<div className="mt-8">
					<MaximumRepeatingSalaries />
				</div>
				<div className="mt-8">
					<ProjectedOwnship />
				</div>
			</div>
		</div>
	) : (
		<></>
	);
};

export default Rules;
