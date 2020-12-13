import { connect } from 'react-redux';
import { setSetting } from './Stacking.actions';

import NumberOfPlayersToStack from './Stacking.numberOfPlayersToStack';
import FromTeams from './Stacking.fromTeams';

const StackingContainer = () => (
	<div className="container mx-auto px-8 my-8">
		<NumberOfPlayersToStack />
		<FromTeams />
	</div>
);

const mapStateToProps = ({ table }) => ({
	teams: table.teams,
});

const mapDispatchToProps = (dispatch) => ({
	setStackingSettings: (setting, key, value) =>
		dispatch(setSetting(setting, key, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StackingContainer);
