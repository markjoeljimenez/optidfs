import { connect } from 'react-redux';
import Search from '../Search/Search';
import Optimize from '../Optimize/Optimize';

const BarContainer = ({ players }: any) =>
	players && players.length ? (
		<>
			<Search />
			<Optimize />
		</>
	) : (
		<></>
	);

const mapStateToProps = ({ table }) => ({
	players: table.players,
});

export default connect(mapStateToProps)(BarContainer);
