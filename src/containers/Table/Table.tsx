import { connect } from 'react-redux';
import { nextPage, previousPage } from './Table.actions';

import Loading from '../../components/loading';
import Table from '../../components/table';
import { lockPlayer } from '../Bar/Bar.actions';

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
});

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
