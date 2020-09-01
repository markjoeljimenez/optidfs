import { connect } from 'react-redux';
import { nextPage, previousPage } from './Table.actions';

import Loading from '../../components/loading';
import Table from '../../components/table';

const TableContainer = (props) =>
	props.players?.length ? (
		<Loading loading={props.loading}>
			<Table {...props} />
		</Loading>
	) : (
		<></>
	);

const mapStateToProps = ({ table }) => ({
	players: table.players,
	loading: table.loading,
	lineups: table.lineups,
	page: table.page,
	totalFppg: table.totalFppg,
	totalSalary: table.totalSalary,
});

const mapDispatchToProps = (dispatch) => ({
	next: () => dispatch(nextPage()),
	previous: () => dispatch(previousPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
