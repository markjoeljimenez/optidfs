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

	return active ? (
		<div className="rules action-bar__rules">
			<div className="rules__mobile-modal">
				<div className="row">
					<div className="col-12 col-md-6">
						<NumberOfGenerations />
					</div>
					<div className="col-12 col-md-6">
						<PlayersFromSameTeam teams={teams} />
						<NumberOfSpecificPositions positions={positions} />
					</div>
					<div className="col-12 col-md-3">
						<MinimumSalary />
						<MaximumRepeatingSalaries />
					</div>
					<div className="col-12 col-md-3">
						<ProjectedOwnship />
					</div>
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
