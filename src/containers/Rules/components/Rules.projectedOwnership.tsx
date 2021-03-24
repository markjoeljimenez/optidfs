import { useRef } from 'react';
import Tippy from '@tippyjs/react';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import {
	removeRule,
	removeRuleError,
	RULE,
	setRule,
	setRuleError,
} from '../Rules.actions';

import InputGroup from '../../../components/form/inputGroup';

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
		<InputGroup
			label="Projected ownership"
			tippy={(
				<Tippy
					className="bg-white rounded shadow-xl p-4"
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
					<div className="absolute inset-y-0 right-0 flex -mt-1">
						<svg
							className="fill-current"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="24"
							height="24"
						>
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
					</div>
				</Tippy>
  )}
		>
			<label htmlFor="minProjectedOwnership">
				<span className="sr-only">Min projected ownership</span>
				<input
					className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="minProjectedOwnership"
					ref={minRef}
					placeholder="Min"
					type="number"
					min={0.1}
					max={1}
					step={0.1}
					onChange={handleMinProjectedOwnershipChange}
				/>
			</label>
			<div className="flex-1 ml-4">
				<label htmlFor="maxProjectedOwnership">
					<span className="sr-only">Max projected ownership</span>
					<input
						className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="maxProjectedOwnership"
						ref={maxRef}
						placeholder="Max"
						type="number"
						min={0.1}
						max={1}
						step={0.1}
						onChange={handleMaxProjectedOwnershipChange}
					/>
				</label>
			</div>
		</InputGroup>
	);
};

export default Rule;
