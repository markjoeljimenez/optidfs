import { connect } from 'react-redux';
import InputGroup from '../../components/form/inputGroup';

import { RULE, setRule } from './Rules.actions';

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
		<InputGroup label="Number of generations">
			<label htmlFor="maxRepeatingPlayers">
				<span className="sr-only">Number of generations</span>
				<input
					className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
		</InputGroup>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setRule: (rule, key, value) => dispatch(setRule(rule, key, value)),
});

export default connect(null, mapDispatchToProps)(Rule);
