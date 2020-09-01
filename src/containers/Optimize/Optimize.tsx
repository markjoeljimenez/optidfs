import { useRef } from 'react';
import { connect } from 'react-redux';
import { optimize } from './Optimize.actions';

const Optimize = (props: any) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleClick = () => {
		if (!inputRef.current) {
			return;
		}

		const { value } = inputRef.current;

		props.optimize(props.draftGroupId, value);
	};

	return (
		<>
			<div className="input">
				<label htmlFor="numberOfGenerations">
					<span className="u-hidden">Number of generations</span>
					<input
						ref={inputRef}
						defaultValue={1}
						id="numberOfGenerations"
						min={1}
						placeholder="Number of generations"
						required
						type="number"
					/>
				</label>
			</div>
			<button
				className="form__optimize button button--light"
				type="button"
				onClick={handleClick}
			>
				Optimize
			</button>
		</>
	);
};

const mapStateToProps = ({ table }) => ({
	draftGroupId: table.draftGroupId,
});

const mapDispatchToProps = (dispatch) => ({
	optimize: (id, value) => dispatch(optimize(id, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Optimize);
