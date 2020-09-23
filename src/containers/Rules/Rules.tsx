import { useState } from 'react';
import { connect } from 'react-redux';
import uniqBy from 'lodash.uniqby';

import PlayersFromSameTeam from './Rules.playersFromSameTeam';
import NumberOfSpecificPositions from './Rules.numberOfSpecificPositions';
import MinimumSalary from './Rules.minimumSalary';
import MaximumRepeatingSalaries from './Rules.maxRepeatingPlayers';
import ProjectedOwnship from './Rules.projectedOwnership';
import Chevron from '../../components/global/chevron';

const RulesContainer = ({ players }: any) => {
	const [showRules, setShowRules] = useState(false);
	const teams = players && uniqBy(players, 'team').map(({ team }) => team);
	const positions =
		players &&
		uniqBy(
			uniqBy(players, 'position')
				.map(({ position }) => position)
				.map((pos: string) => pos.split('/'))
				.flat()
		);

	const handleRuleClick = () => {
		setShowRules(!showRules);
	};

	return (
		<div className="rules">
			<div className="rules__button">
				<button type="button" onClick={handleRuleClick}>
					<span>
						Rules
						<Chevron active={showRules} />
					</span>
				</button>
			</div>

			{showRules && (
				<div className="row">
					<div className="col col-md-6">
						<PlayersFromSameTeam teams={teams} />
						<NumberOfSpecificPositions positions={positions} />
					</div>
					<div className="col">
						<MinimumSalary />
						<MaximumRepeatingSalaries />
					</div>
					<div className="col">
						<ProjectedOwnship />
					</div>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = ({ table }) => ({
	players: table.players,
});

export default connect(mapStateToProps)(RulesContainer);
