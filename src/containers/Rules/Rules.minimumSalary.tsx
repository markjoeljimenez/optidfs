import { connect } from 'react-redux';
import { RULE, setRule, removeRule } from './Rules.actions';

const Rule = (props: any) => {
	const handleMinSalaryCapChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value } = e.currentTarget;

		props.setRule(RULE.MINIMUM_SALARY_CAP, undefined, parseInt(value));
	};

	return (
		<div className="input-group">
			<span className="inline-block mb-2 text-xs uppercase font-black">
				Minimum salary cap
			</span>
			<label htmlFor="minSalaryCap">
				<span className="sr-only">Minimum Salary Cap</span>
				<input
					className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="minSalaryCap"
					placeholder="0"
					type="number"
					min={0}
					step={5000}
					onChange={handleMinSalaryCapChange}
				/>
			</label>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setRule: (rule, key, value) => dispatch(setRule(rule, key, value)),
	removeRule: (rule, key) => dispatch(removeRule(rule, key)),
});

export default connect(null, mapDispatchToProps)(Rule);
