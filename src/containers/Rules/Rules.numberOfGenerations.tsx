import { connect } from 'react-redux';

import { RULE, setRule, removeRule } from './Rules.actions';

const Rule = (props: any) => {
	const max = 20;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.currentTarget.value);

		if (value > max) {
			e.currentTarget.value = max.toString();

			return;
		}

		props.setRule(RULE.NUMBER_OF_GENERATIONS, undefined, value);
	};

	return (
		<div className="input-group">
			<span className="input-group__label">Number of generations</span>
			<div className="input input-group__input">
				<label htmlFor="maxRepeatingPlayers">
					<span className="u-hidden">Number of generations</span>
					<input
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
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setRule: (rule, key, value) => dispatch(setRule(rule, key, value)),
	removeRule: (rule, key) => dispatch(removeRule(rule, key)),
});

export default connect(null, mapDispatchToProps)(Rule);
