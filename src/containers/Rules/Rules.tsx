import { connect } from 'react-redux';
import uniqBy from 'lodash.uniqby';

import PlayersFromSameTeam from './Rules.playersFromSameTeam';
import NumberOfSpecificPositions from './Rules.numberOfSpecificPositions';
import MinimumSalary from './Rules.minimumSalary';
import MaximumRepeatingSalaries from './Rules.maxRepeatingPlayers';
import ProjectedOwnship from './Rules.projectedOwnership';
import NumberOfGenerations from './Rules.numberOfGenerations';

const RulesContainer = ({ players, active }: any) => {
	const teams = players && uniqBy(players, 'team').map(({ team }) => team);
	const positions =
		players &&
		uniqBy(
			uniqBy(players, 'position')
				.map(({ position }) => position)
				.map((pos: string) => pos.split('/'))
				.flat()
		);

	return players ? (
		<div className="container mx-auto px-8 my-8 flex">
			<div className="flex-1">
				<div>
					<NumberOfGenerations />
				</div>
				<div className="mt-8">
					<PlayersFromSameTeam teams={teams} />
				</div>
				<div className="mt-8">
					<NumberOfSpecificPositions positions={positions} />
				</div>
			</div>
			<div className="flex-1 ml-8">
				<div>
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

const mapStateToProps = ({ table, rules }) => ({
	players: table.players,
	active: rules.active,
});

export default connect(mapStateToProps)(RulesContainer);
