import React, { useRef } from 'react';

import Button from '../../../components/form/button';
import Fieldset from '../../../components/form/fieldset';
import Input from '../../../components/form/input';
import Select from '../../../components/form/select';
import Badge, { BadgeColor } from '../../../components/global/badge';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { removeRule, RULE, setRule } from '../Rules.actions';

const Rule = () => {
	const dispatch = useAppDispatch();
	const { players, rules } = useAppSelector((state) => state);

	const numberOfSpecificPositionsSelectRef = useRef<HTMLSelectElement>(null);
	const numberOfSpecificPositionsInputRef = useRef<HTMLInputElement>(null);

	function handleNumberOfSpecificPositionsClick() {
		if (
			!numberOfSpecificPositionsSelectRef &&
			!numberOfSpecificPositionsInputRef
		) {
			return;
		}

		const team = numberOfSpecificPositionsSelectRef.current?.value;
		const value = numberOfSpecificPositionsInputRef.current?.value;

		if (team && value) {
			dispatch(
				setRule(
					RULE.NUMBER_OF_SPECIFIC_POSITIONS,
					team,
					parseInt(value)
				)
			);
		}
	}

	function handleRemoveRule(e: React.MouseEvent<HTMLButtonElement>) {
		const { value } = e.currentTarget;
		const rule = e.currentTarget.getAttribute('data-rule');

		if (!value || !rule) {
			return;
		}

		dispatch(removeRule(rule, value));
	}

	return (
		<div>
			<Fieldset legend="Number of specific positions">
				<div className="flex space-x-4 mt-2">
					<Select
						className="flex-1"
						defaultValue=""
						hideLabel
						id="numberOfSpecificPositionsSelect"
						label="Select position"
						options={players?.positions!}
						placeholder="Select position"
						ref={numberOfSpecificPositionsSelectRef}
					/>
					<Input
						className="flex-1"
						id="numberOfSpecificPositions"
						label="Number of specific positions"
						max={3}
						min={0}
						placeholder="# of players"
						ref={numberOfSpecificPositionsInputRef}
						type="number"
						hideLabel
					/>
					<Button onClick={handleNumberOfSpecificPositionsClick}>
						Add
					</Button>
				</div>
			</Fieldset>

			{rules.NUMBER_OF_SPECIFIC_POSITIONS && (
				<div className="flex mt-4">
					{rules.NUMBER_OF_SPECIFIC_POSITIONS.map(
						({ key, value }, i) => (
							<div key={i} className="relative ml-4 first:ml-0">
								<Badge
									text={`${key} - ${value}`}
									color={BadgeColor.Yellow}
									value={key}
									onClick={handleRemoveRule}
									data={{
										'data-rule':
											RULE.NUMBER_OF_SPECIFIC_POSITIONS,
									}}
								/>
							</div>
						)
					)}
				</div>
			)}
		</div>
	);
};

export default Rule;
