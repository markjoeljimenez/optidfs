import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

import {
	setSetting,
	STACKING_TEAM_SETTINGS,
	STACKING_TYPE,
} from '../../Stacking.actions';

import InputGroup from '../../../../components/form/inputGroup';

const StackSetting = () => {
	const dispatch = useAppDispatch();
	const { stacking } = useAppSelector((state) => state);

	const isError = stacking.TEAM && !stacking.TEAM.NUMBER_OF_PLAYERS_TO_STACK;

	const handleNumberOfPlayers = (e: ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.currentTarget.value);

		dispatch(
			setSetting(
				STACKING_TYPE.TEAM,
				STACKING_TEAM_SETTINGS.NUMBER_OF_PLAYERS_TO_STACK,
				undefined,
				value
			)
		);
	};

	return (
		<InputGroup label="Number of Players (Required)" error={isError}>
			<div>
				<label htmlFor="numberOfPlayers">
					<span className="sr-only">Number of Players</span>
					<input
						className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="numberOfPlayers"
						placeholder="0"
						type="number"
						min={0}
						onChange={handleNumberOfPlayers}
						required
					/>
				</label>
				{isError && (
					<p className="text-red-700 text-xs uppercase font-black mt-3">
						Field cannot remain empty
					</p>
				)}
			</div>
		</InputGroup>
	);
};

export default StackSetting;
