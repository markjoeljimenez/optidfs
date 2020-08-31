import { connect } from 'react-redux';
import { getPlayers } from './Dropdown.actions';
import Dropdown from '../../components/dropdown';
import { resetPlayers } from '../Table/Table.actions';

const mapStateToProps = ({ dropdown, table }: any) => ({
	contests: dropdown.contests,
	players: table.players,
});

const mapDispatchToProps = (dispatch) => ({
	getPlayers: (id) => dispatch(getPlayers(id)),
	resetPlayers: () => dispatch(resetPlayers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
