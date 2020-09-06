import { connect } from 'react-redux';
import { RULE, setRule, removeRule } from './Rules.actions';

const Rule = (props: any) => {
	const handleMaxRepeatingPlayers = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value } = e.currentTarget;

		props.setRule(RULE.MAX_REPEATING_PLAYERS, undefined, parseInt(value));
	};

	return (
		<div className="input-group">
			Maximum repeating players
			<div className="input input-group__input">
				<label htmlFor="maxRepeatingPlayers">
					<span className="u-hidden">Maximum repeating players</span>
					<input
						id="maxRepeatingPlayers"
						placeholder="Maximum repeating players"
						type="number"
						min={0}
						onChange={handleMaxRepeatingPlayers}
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
