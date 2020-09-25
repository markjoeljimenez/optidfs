import { connect } from 'react-redux';
import { optimize } from './Optimize.actions';

const Optimize = (props: any) => {
	const handleClick = () => {
		props.optimizeLineups(props.value);
	};

	return (
		<div className="optimize">
			<button
				className="action-bar__optimize form__optimize button button--light"
				type="button"
				onClick={handleClick}
			>
				Optimize
			</button>
		</div>
	);
};

const mapStateToProps = ({ table, rules }) => ({
	draftGroupId: table.draftGroupId,
	value: rules.NUMBER_OF_GENERATIONS,
});

const mapDispatchToProps = (dispatch) => ({
	optimizeLineups: (value) => dispatch(optimize(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Optimize);
