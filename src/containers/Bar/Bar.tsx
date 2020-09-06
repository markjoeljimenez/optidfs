import { connect } from 'react-redux';

import Search from '../Search/Search';
import Optimize from '../Optimize/Optimize';
import Rules from '../Rules/Rules';

const BarContainer = ({ players }: any) =>
	players ? (
		<>
			<div className="row">
				<div className="col col-md-9">
					<Search />
				</div>
				<div className="col">
					<Optimize />
				</div>
			</div>
			<div className="row">
				<div className="col">
					<Rules />
				</div>
			</div>
		</>
	) : (
		<></>
	);

const mapStateToProps = ({ table }) => ({
	players: table.players,
});

export default connect(mapStateToProps)(BarContainer);
