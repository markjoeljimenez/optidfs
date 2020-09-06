import { connect } from 'react-redux';
import { getPlayers, resetPlayers } from './Dropdown.actions';
import Dropdown from '../../components/dropdown';
import { resetRules } from '../Rules/Rules.actions';

const mapStateToProps = ({ dropdown, table }: any) => ({
	contests: dropdown.contests,
	players: table.players,
});

const mapDispatchToProps = (dispatch) => ({
	getPlayers: (id) => dispatch(getPlayers(id)),
	resetPlayers: () => dispatch(resetPlayers()),
	resetRules: () => dispatch(resetRules()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
