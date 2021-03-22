import { useAppSelector } from '../../../hooks';

import MaximumRepeatingSalaries from './Rules.maxRepeatingPlayers';
import MinimumSalary from './Rules.minimumSalary';
import NumberOfGenerations from './Rules.numberOfGenerations';
import NumberOfSpecificPositions from './Rules.numberOfSpecificPositions';
import PlayersFromSameTeam from './Rules.playersFromSameTeam';
import ProjectedOwnship from './Rules.projectedOwnership';

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
