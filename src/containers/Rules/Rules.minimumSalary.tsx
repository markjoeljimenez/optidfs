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
			Minimum Salary Cap
			<div className="input input-group__input">
				<label htmlFor="minSalaryCap">
					<span className="u-hidden">Minimum Salary Cap</span>
					<input
						id="minSalaryCap"
						placeholder="Minimum salary cap"
						type="number"
						min={0}
						step={5000}
						onChange={handleMinSalaryCapChange}
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
