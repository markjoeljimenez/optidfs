import { connect } from 'react-redux';
import { setSport } from './Header.actions';
import Nav from '../../components/global/nav';

const HeaderContainer = (props) => <Nav {...props} />;

const mapStateToProps = ({ header }) => ({
	sport: header.sport,
});

const mapDispatchToProps = (dispatch) => ({
	setSport: (sport) => dispatch(setSport(sport)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
