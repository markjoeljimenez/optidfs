import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import { removeRule, RULE, setRule } from '../Rules.actions';

import Input from '../../../components/form/input';
import Select from '../../../components/form/select';
import Button from '../../../components/form/button';
import Fieldset from '../../../components/form/fieldset';
import Badge, { BadgeColor } from '../../../components/global/badge';

const Rule = () => {
	const dispatch = useAppDispatch();
	const { players, rules } = useAppSelector((state) => state);

	const playersFromSameTeamSelectRef = useRef<HTMLSelectElement>(null);
	const playersFromSameTeamInputRef = useRef<HTMLInputElement>(null);

	function handleNumberOfPlayersFromTeamClick() {
		if (!playersFromSameTeamSelectRef && !playersFromSameTeamInputRef) {
			return;
		}

		const team = playersFromSameTeamSelectRef.current?.value;
		const value = playersFromSameTeamInputRef.current?.value;

		if (team && value) {
			dispatch(
				setRule(
					RULE.NUMBER_OF_PLAYERS_TO_STACK_FROM_SAME_TEAM,
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
			<Fieldset legend="Number of players from same team">
				<div className="flex space-x-4 mt-2">
					<Select
						className="flex-1"
						defaultValue=""
						hideLabel
						id="playersFromSameTeam"
						label="Select team"
						options={players?.teams!}
						placeholder="Select team"
						ref={playersFromSameTeamSelectRef}
					/>
					<Input
						className="flex-1"
						id="numberOfPlayersPerTeam"
						label="Number of players from same team"
						max={8}
						min={0}
						placeholder="# of players"
						ref={playersFromSameTeamInputRef}
						type="number"
						hideLabel
					/>

					<Button onClick={handleNumberOfPlayersFromTeamClick}>
						Add
					</Button>
				</div>
			</Fieldset>

			{rules.NUMBER_OF_PLAYERS_TO_STACK_FROM_SAME_TEAM && (
				<div className="flex mt-3">
					{rules.NUMBER_OF_PLAYERS_TO_STACK_FROM_SAME_TEAM.map(
						({ key, value }, i) => (
							<div key={i} className="ml-2 first:ml-0">
								<Badge
									text={`${key} - ${value}`}
									color={BadgeColor.Yellow}
									value={key}
									onClick={handleRemoveRule}
									data={{
										'data-rule':
											RULE.NUMBER_OF_PLAYERS_TO_STACK_FROM_SAME_TEAM,
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
