import Tippy from '@tippyjs/react';
import { useRef } from 'react';

import Input from '../../../components/form/input';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
	removeRule,
	removeRuleError,
	RULE,
	setRule,
	setRuleError,
} from '../Rules.actions';

const Rule = () => {
	const dispatch = useAppDispatch();
	const { error } = useAppSelector((state) => state);

	// const error = errors?.find(
	// 	(_error) => _error.rule === RULE.MIN_PROJECTED_OWNERSHIP
	// );

	const minRef = useRef<HTMLInputElement>(null);
	const maxRef = useRef<HTMLInputElement>(null);

	function handleMinProjectedOwnershipChange(
		e: React.ChangeEvent<HTMLInputElement>
	) {
		const maxValue = maxRef.current?.value;
		const { value } = e.currentTarget;

		if (!maxValue || parseFloat(maxValue) < parseFloat(value)) {
			dispatch(
				setRuleError(
					RULE.MIN_PROJECTED_OWNERSHIP,
					'Max value has to be greater than or equal to the min value!'
				)
			);
		} else {
			dispatch(removeRuleError(RULE.MIN_PROJECTED_OWNERSHIP));
			dispatch(
				setRule(
					RULE.MIN_PROJECTED_OWNERSHIP,
					undefined,
					parseFloat(value)
				)
			);
		}
	}

	function handleMaxProjectedOwnershipChange(
		e: React.ChangeEvent<HTMLInputElement>
	) {
		const minValue = minRef.current?.value;
		const { value } = e.currentTarget;

		if (!minValue || parseFloat(minValue) <= parseFloat(value)) {
			dispatch(removeRuleError(RULE.MIN_PROJECTED_OWNERSHIP));
			dispatch(
				setRule(
					RULE.MAX_PROJECTED_OWNERSHIP,
					undefined,
					parseFloat(value)
				)
			);
		} else {
			dispatch(
				setRuleError(
					RULE.MIN_PROJECTED_OWNERSHIP,
					'Max value has to be greater than or equal to the min value!'
				)
			);
		}
	}

	return (
		<Input
			// ref={minRef}
			id="minProjectedOwnership"
			label="Projected ownership"
			max={1}
			min={0.1}
			placeholder="Min"
			step={0.1}
			tippy={
				<Tippy
					className="bg-white rounded shadow p-4"
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
								<i>projected ownership</i> of the players you
								want this field to affect.
							</p>
						</div>
					}
				>
					<div className="inline-block ml-2 align-top">
						<svg
							className="h-5 w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
							/>
						</svg>
					</div>
				</Tippy>
			}
			type="number"
			onChange={handleMinProjectedOwnershipChange}
		/>
	);
};

export default Rule;
