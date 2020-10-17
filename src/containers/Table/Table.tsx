import { connect } from 'react-redux';
import {
	nextPage,
	previousPage,
	setPlayerExposure,
	lockPlayer,
	setPlayerProjectedOwnership,
	downloadCsv,
} from './Table.actions';

import Loading from '../../components/loading';
import Table from '../../components/table';

const TableContainer = (props: any) => {
	const { players, loading } = props;

	return players ? (
		<Loading loading={loading}>
			<Table {...props} />
		</Loading>
	) : (
		<></>
	);
};

const mapStateToProps = ({ table }) => ({
	lineups: table.lineups,
	loading: table.loading,
	lockedPlayers: table.lockedPlayers,
	page: table.page,
	players: table.players,
	totalFppg: table.totalFppg,
	totalSalary: table.totalSalary,
});

const mapDispatchToProps = (dispatch) => ({
	next: () => dispatch(nextPage()),
	previous: () => dispatch(previousPage()),
	lock: (e) => dispatch(lockPlayer(e)),
	setExposure: (id, value) => dispatch(setPlayerExposure(id, value)),
	setProjectedOwnership: (id, value) =>
		dispatch(setPlayerProjectedOwnership(id, value)),
	downloadCsv: () => dispatch(downloadCsv()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
