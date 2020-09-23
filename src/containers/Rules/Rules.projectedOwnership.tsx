import { connect } from 'react-redux';
import { RULE, setRule, removeRule } from './Rules.actions';

const Rule = (props: any) => {
	const handleProjectedOwnershipChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value } = e.currentTarget;

		props.setRule(RULE.PROJECTED_OWNERSHIP, undefined, parseFloat(value));
	};

	return (
		<div className="input-group">
			<span className="input-group__label">Projected ownership</span>
			<div className="input input-group__input">
				<label htmlFor="projectedOwnership">
					<span className="u-hidden">Projected ownership</span>
					<input
						id="projectedOwnership"
						placeholder="Projected ownership"
						type="number"
						min={0}
						max={1}
						step={0.1}
						onChange={handleProjectedOwnershipChange}
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
