import { connect } from 'react-redux';
import { optimize } from './Optimize.actions';

const Optimize = (props: any) => {
	const handleClick = () => {
		props.optimizeLineups(props.value);
	};

	return (
		<div>
			<button
				className="py-2 px-5 bg-blue-400 text-blue-900 rounded-full font-black hover:bg-blue-800 hover:text-white"
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
