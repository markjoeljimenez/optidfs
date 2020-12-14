import { ChangeEvent } from 'react';
import { connect } from 'react-redux';

import {
	setSetting,
	STACKING_TEAM_SETTINGS,
	STACKING_TYPE,
} from './Stacking.actions';

interface IStackingSetting {
	inputValue: number | undefined;
	setStackingSetting(
		stackingType: string,
		setting: string,
		key: string | undefined,
		value: number
	): void;
}

const StackSetting = ({ inputValue, setStackingSetting }: IStackingSetting) => {
	function handleNumberOfPlayers(e: ChangeEvent<HTMLInputElement>) {
		const value = parseInt(e.currentTarget.value);

		setStackingSetting(
			STACKING_TYPE.TEAM,
			STACKING_TEAM_SETTINGS.NUMBER_OF_PLAYERS_TO_STACK,
			undefined,
			value
		);
	}

	return (
		<div>
			<span className="inline-block mb-2 text-xs uppercase font-black">
				Number of Players
			</span>
			<label htmlFor="numberOfPlayers">
				<span className="sr-only">Number of Players</span>
				<input
					className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="numberOfPlayers"
					placeholder="0"
					type="number"
					// min={0}
					onChange={handleNumberOfPlayers}
					value={inputValue || ''}
				/>
			</label>
		</div>
	);
};

const mapStateToProps = ({ stacking }) => ({
	inputValue: stacking.TEAM?.NUMBER_OF_PLAYERS_TO_STACK,
});

const mapDispatchToProps = (dispatch) => ({
	setStackingSetting: (stackingType, setting, key, value) =>
		dispatch(setSetting(stackingType, setting, key, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StackSetting);
