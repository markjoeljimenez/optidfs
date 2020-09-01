import { connect } from 'react-redux';
import { optimize } from './Optimize.actions';

const Optimize = (props: any) => (
	<button
		className="form__optimize button button--light"
		type="button"
		onClick={() => {
			props.optimize(props.draftGroupId);
		}}
	>
		Optimize
	</button>
);

const mapStateToProps = ({ table }) => ({
	draftGroupId: table.draftGroupId,
});

const mapDispatchToProps = (dispatch) => ({
	optimize: (id) => dispatch(optimize(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Optimize);
