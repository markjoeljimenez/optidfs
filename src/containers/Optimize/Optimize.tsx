import { useRef } from 'react';
import { connect } from 'react-redux';
import { optimize } from './Optimize.actions';

const Optimize = (props: any) => {
	const max = 20;
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.currentTarget.value);

		if (value > max) {
			e.currentTarget.value = max.toString();
		}
	};

	const handleClick = () => {
		if (!inputRef.current) {
			return;
		}

		const value = parseInt(inputRef.current.value);

		props.optimizeLineups(value);
	};

	return (
		<div className="optimize">
			<div className="input">
				<label htmlFor="numberOfGenerations">
					<span className="u-hidden">Number of generations</span>
					<input
						ref={inputRef}
						defaultValue={1}
						id="numberOfGenerations"
						min={1}
						max={max}
						placeholder="Number of generations"
						required
						type="number"
						onChange={handleChange}
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
		</div>
	);
};

const mapStateToProps = ({ table }) => ({
	draftGroupId: table.draftGroupId,
});

const mapDispatchToProps = (dispatch) => ({
	optimizeLineups: (value) => dispatch(optimize(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Optimize);
