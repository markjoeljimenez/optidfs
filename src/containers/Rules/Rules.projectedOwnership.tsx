import { connect } from 'react-redux';
import Tippy from '@tippyjs/react';

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
			<span className="input-group__label">
				Projected ownership
				<Tippy
					className="tooltip"
					content={
						<div>
							<p>
								<strong>Value: 0.0 - 1.0</strong>
							</p>

							<p>
								Set this field if you want to avoid a lot of
								highly-owned players in your lineups.
							</p>

							<p>
								<strong>Note:</strong> Remember to set the{' '}
								<i>ownership projection</i> of the players you
								want this field to affect.
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
			<div className="input-group__inputs">
				<div className="input input-group__input">
					<label htmlFor="minProjectedOwnership">
						<span className="u-hidden">
							Min projected ownership
						</span>
						<input
							id="minProjectedOwnership"
							placeholder="Min"
							type="number"
							min={0}
							max={1}
							step={0.1}
							// onChange={handleProjectedOwnershipChange}
						/>
					</label>
				</div>
				<div className="input input-group__input">
					<label htmlFor="maxProjectedOwnership">
						<span className="u-hidden">
							Max projected ownership
						</span>
						<input
							id="maxProjectedOwnership"
							placeholder="Max"
							type="number"
							min={0}
							max={1}
							step={0.1}
							onChange={handleProjectedOwnershipChange}
						/>
					</label>
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setRule: (rule, key, value) => dispatch(setRule(rule, key, value)),
	removeRule: (rule, key) => dispatch(removeRule(rule, key)),
});

export default connect(null, mapDispatchToProps)(Rule);
