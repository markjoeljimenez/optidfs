import { connect } from 'react-redux';
import uniqBy from 'lodash.uniqby';

import PlayersFromSameTeam from './Rules.playersFromSameTeam';
import NumberOfSpecificPositions from './Rules.numberOfSpecificPositions';
import MinimumSalary from './Rules.minimumSalary';
import MaximumRepeatingSalaries from './Rules.maxRepeatingPlayers';
import ProjectedOwnship from './Rules.projectedOwnership';

const RulesContainer = ({ players }: any) => {
	const teams = players && uniqBy(players, 'team').map(({ team }) => team);
	const positions =
		players &&
		uniqBy(
			uniqBy(players, 'position')
				.map(({ position }) => position)
				.map((pos: string) => pos.split('/'))
				.flat()
		);

	return (
		<>
			Rules
			<PlayersFromSameTeam teams={teams} />
			<NumberOfSpecificPositions positions={positions} />
			<MinimumSalary />
			<MaximumRepeatingSalaries />
			<ProjectedOwnship />
		</>
	);
};

const mapStateToProps = ({ table }) => ({
	players: table.players,
});

export default connect(mapStateToProps)(RulesContainer);
