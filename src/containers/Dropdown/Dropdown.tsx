import { connect } from 'react-redux';
import getPlayers from './Dropdown.actions';
import Dropdown from '../../components/dropdown';

const mapStateToProps = ({ dropdown }: any) => ({
	contests: dropdown.contests,
});

const mapDispatchToProps = (dispatch) => ({
	getPlayers: (id) => dispatch(getPlayers(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
