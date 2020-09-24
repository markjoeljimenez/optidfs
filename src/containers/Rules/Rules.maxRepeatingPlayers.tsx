import { connect } from 'react-redux';
import Tippy from '@tippyjs/react';

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
			<span className="input-group__label">
				Maximum repeating players
				<Tippy
					className="tooltip"
					content={
						<div>
							<p>
								<strong>
									Value: <i>n</i>
								</strong>
							</p>

							<p>
								Set this field if you want to make more random
								lineups.
							</p>
						</div>
					}
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<g data-name="Layer 2">
							<g data-name="info">
								<rect
									width="24"
									height="24"
									transform="rotate(180 12 12)"
									opacity="0"
								/>
								<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
								<circle cx="12" cy="8" r="1" />
								<path d="M12 10a1 1 0 0 0-1 1v5a1 1 0 0 0 2 0v-5a1 1 0 0 0-1-1z" />
							</g>
						</g>
					</svg>
				</Tippy>
			</span>
			<div className="input input-group__input">
				<label htmlFor="maxRepeatingPlayers">
					<span className="u-hidden">Maximum repeating players</span>
					<input
						id="maxRepeatingPlayers"
						placeholder="0"
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
