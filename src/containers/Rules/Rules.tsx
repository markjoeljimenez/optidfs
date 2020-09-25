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
		<div className={`rules ${active ? 'rules--active' : ''}`}>
			<div className="row">
				<div className="col">
					<h2 className="rules__heading">Rules</h2>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<NumberOfGenerations />
				</div>
			</div>
			<div className="row">
				<div className="col">
					<PlayersFromSameTeam teams={teams} />
				</div>
			</div>
			<div className="row">
				<div className="col">
					<NumberOfSpecificPositions positions={positions} />
				</div>
			</div>
			<div className="row">
				<div className="col">
					<MinimumSalary />
				</div>
			</div>
			<div className="row">
				<div className="col">
					<MaximumRepeatingSalaries />
				</div>
			</div>
			<div className="row">
				<div className="col">
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
