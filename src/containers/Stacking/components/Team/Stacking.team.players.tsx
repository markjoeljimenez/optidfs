import { ChangeEvent } from 'react';

import Input from '../../../../components/form/input';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
	setSetting,
	STACKING_TEAM_SETTINGS,
	STACKING_TYPE,
} from '../../Stacking.actions';

const StackSetting = () => {
	const dispatch = useAppDispatch();
	const { stacking } = useAppSelector((state) => state);

	const isError = stacking.TEAM && !stacking.TEAM.NUMBER_OF_PLAYERS_TO_STACK;

	function handleNumberOfPlayers(e: ChangeEvent<HTMLInputElement>) {
		const value = parseInt(e.currentTarget.value);

		dispatch(
			setSetting(
				STACKING_TYPE.TEAM,
				STACKING_TEAM_SETTINGS.NUMBER_OF_PLAYERS_TO_STACK,
				undefined,
				value
			)
		);
	}

	return (
		<Input
			error={{
				isError,
				message: 'Field cannot remain empty',
			}}
			id="numberOfPlayers"
			label="Number of Players (Required)"
			min={0}
			onChange={handleNumberOfPlayers}
			placeholder="0"
			required
			type="number"
		/>
	);
};

export default StackSetting;
