import { connect } from 'react-redux';
import {
	nextPage,
	previousPage,
	setPlayerExposure,
	lockPlayer,
	setPlayerProjectedOwnership,
} from './Table.actions';

import Error from '../Error/Error';
import Loading from '../../components/loading';
import Table from '../../components/table';

const TableContainer = (props: any) => {
	const { players, loading, error } = props;

	return players && !error ? (
		<Loading loading={loading}>
			<Table {...props} />
		</Loading>
	) : error ? (
		<div className="container mx-auto py-4">
			<Error />
		</div>
	) : (
		<></>
	);
};

const mapStateToProps = ({ table, error }) => ({
	...table,
	error,
});

const mapDispatchToProps = (dispatch) => ({
	next: () => dispatch(nextPage()),
	previous: () => dispatch(previousPage()),
	lock: (e) => dispatch(lockPlayer(e)),
	setExposure: (id, value) => dispatch(setPlayerExposure(id, value)),
	setProjectedOwnership: (id, value) =>
		dispatch(setPlayerProjectedOwnership(id, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
