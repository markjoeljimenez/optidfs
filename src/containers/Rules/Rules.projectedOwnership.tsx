import { useRef } from 'react';
import { connect } from 'react-redux';
import Tippy from '@tippyjs/react';

import {
	RULE,
	setRule,
	removeRule,
	setRuleError,
	removeRuleError,
} from './Rules.actions';

const Rule = (props: any) => {
	const { errors } = props;

	const error = errors.find(
		(_error) => _error.rule === RULE.MIN_PROJECTED_OWNERSHIP
	);

	const minRef = useRef<HTMLInputElement>(null);
	const maxRef = useRef<HTMLInputElement>(null);

	const handleMinProjectedOwnershipChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const maxValue = maxRef.current?.value;
		const { value } = e.currentTarget;

		if (!maxValue || parseFloat(maxValue) < parseFloat(value)) {
			props.setRuleError(
				RULE.MIN_PROJECTED_OWNERSHIP,
				'Max value has to be greater than or equal to the min value!'
			);
		} else {
			props.removeRuleError(RULE.MIN_PROJECTED_OWNERSHIP);
			props.setRule(
				RULE.MIN_PROJECTED_OWNERSHIP,
				undefined,
				parseFloat(value)
			);
		}
	};

	const handleMaxProjectedOwnershipChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const minValue = minRef.current?.value;
		const { value } = e.currentTarget;

		if (!minValue || parseFloat(minValue) <= parseFloat(value)) {
			props.removeRuleError(RULE.MIN_PROJECTED_OWNERSHIP);
			props.setRule(
				RULE.MAX_PROJECTED_OWNERSHIP,
				undefined,
				parseFloat(value)
			);
		} else {
			props.setRuleError(
				RULE.MIN_PROJECTED_OWNERSHIP,
				'Max value has to be greater than or equal to the min value!'
			);
		}
	};

	return (
		<div className={`input-group ${error ? 'input-group--error' : ''}`}>
			<span className="input-group__label">
				Projected ownership
				<Tippy
					className="tooltip"
					content={(
						<div>
							<p>
								<strong>Value: 0.0 - 1.0</strong>
							</p>

							<p>
								Set this field if you want to avoid a lot of
								highly-owned players in your lineups.
							</p>

							<p>
								<strong>Note:</strong>
								{' '}
								Remember to set the
								{' '}
								<i>projected ownership</i>
								{' '}
								of the players you
								want this field to affect.
							</p>
						</div>
    )}
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
							ref={minRef}
							placeholder="Min"
							type="number"
							min={0}
							max={1}
							step={0.1}
							onChange={handleMinProjectedOwnershipChange}
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
							ref={maxRef}
							placeholder="Max"
							type="number"
							min={0}
							max={1}
							step={0.1}
							onChange={handleMaxProjectedOwnershipChange}
						/>
					</label>
				</div>
			</div>
			{error && <p className="error input-group__error">{error.value}</p>}
		</div>
	);
};

const mapStateToProps = ({ rules }) => ({
	errors: rules.errors,
});

const mapDispatchToProps = (dispatch) => ({
	setRule: (rule, key, value) => dispatch(setRule(rule, key, value)),
	setRuleError: (rule, value) => dispatch(setRuleError(rule, value)),
	removeRuleError: (rule) => dispatch(removeRuleError(rule)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rule);
