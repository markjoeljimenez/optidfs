import { connect } from 'react-redux';

import Search from '../Search/Search';
import Optimize from '../Optimize/Optimize';
import { openModal } from '../Rules/Rules.actions';

const BarContainer = ({ players }: any) =>
	players ? (
		<div className="flex items-center justify-between">
			<div className="flex-1 mr-4">
				<Search />
			</div>
			<Optimize />
		</div>
	) : (
		<></>
	);

const mapStateToProps = ({ table }) => ({
	players: table.players,
});

const mapDispatchToProps = (dispatch) => ({
	openModal: (value) => dispatch(openModal(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BarContainer);
