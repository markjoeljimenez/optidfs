import { connect } from 'react-redux';
import {
	nextPage,
	previousPage,
	setPlayerExposure,
	lockPlayer,
	setPlayerProjectedOwnership,
} from './Table.actions';

import Error, { IError } from '../Error/Error';
import Loading from '../../components/loading';
import Table from '../../components/table';

interface ITableContainerProps {
	table: any;
	error: null | IError;
}

const TableContainer = ({ table, error }: ITableContainerProps) => {
	const { players, loading } = table;

	return players && !error?.show ? (
		<Loading loading={loading}>
			<Table {...table} />
		</Loading>
	) : error?.show ? (
		<div className="container mx-auto py-4">
			<Error />
		</div>
	) : (
		<></>
	);
};

const mapStateToProps = ({ table, error, stacking }) => ({
	table,
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
