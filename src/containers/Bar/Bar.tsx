import { connect } from 'react-redux';
import Search from '../Search/Search';
import Optimize from '../Optimize/Optimize';

const BarContainer = (props: any) =>
	props.draftGroupId ? (
		<>
			<div className="row">
				<div className="col col-md-9">
					<Search />
				</div>
				<div className="col">
					<Optimize />
				</div>
			</div>
		</>
	) : (
		<></>
	);

const mapStateToProps = ({ table }) => ({
	draftGroupId: table.draftGroupId,
	selectedPlayers: table.selectedPlayers,
	lockedPlayers: table.lockedPlayers,
});

export default connect(mapStateToProps, null)(BarContainer);
