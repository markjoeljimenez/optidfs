import clsx from 'clsx';
import { ChangeEvent } from 'react';
import { connect } from 'react-redux';

import {
	setSetting,
	STACKING_TEAM_SETTINGS,
	STACKING_TYPE,
} from './Stacking.actions';

interface IStackingSetting {
	stacking: any;
	setStackingSetting(
		stackingType: string,
		setting: string,
		key: string | undefined,
		value: number
	): void;
}

const StackSetting = ({ stacking, setStackingSetting }: IStackingSetting) => {
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
			<span
				className={clsx(
					'inline-block mb-2 text-xs uppercase font-black',
					stacking.TEAM && !stacking.TEAM.NUMBER_OF_PLAYERS_TO_STACK
						? 'text-red-700'
						: ''
				)}
			>
				Number of Players (Required)
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
					// value={
					// 	stacking.TEAM?.NUMBER_OF_PLAYERS_TO_STACK || ''
					// }
					required
				/>
			</label>
		</div>
	);
};

const mapStateToProps = ({ stacking }) => ({
	stacking,
});

const mapDispatchToProps = (dispatch) => ({
	setStackingSetting: (stackingType, setting, key, value) =>
		dispatch(setSetting(stackingType, setting, key, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StackSetting);
