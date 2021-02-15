import { connect } from 'react-redux';
import InputGroup from '../../components/form/inputGroup';
import { RULE, setRule, removeRule } from './Rules.actions';

const Rule = (props: any) => {
	const handleMinSalaryCapChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value } = e.currentTarget;

		props.setRule(RULE.MINIMUM_SALARY_CAP, undefined, parseInt(value));
	};

	return (
		<InputGroup label="Minimum salary cap">
			<input
				className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="minSalaryCap"
				placeholder="0"
				type="number"
				min={0}
				step={5000}
				onChange={handleMinSalaryCapChange}
			/>
		</InputGroup>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setRule: (rule, key, value) => dispatch(setRule(rule, key, value)),
	removeRule: (rule, key) => dispatch(removeRule(rule, key)),
});

export default connect(null, mapDispatchToProps)(Rule);
