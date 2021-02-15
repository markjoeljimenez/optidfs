import clsx from 'clsx';
import { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import InputGroup from '../../../components/form/inputGroup';

import {
	setSetting,
	STACKING_TEAM_SETTINGS,
	STACKING_TYPE,
} from '../Stacking.actions';

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
	const isError = stacking.TEAM && !stacking.TEAM.NUMBER_OF_PLAYERS_TO_STACK;

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

const mapStateToProps = ({ stacking }) => ({
	stacking,
});

const mapDispatchToProps = (dispatch) => ({
	setStackingSetting: (stackingType, setting, key, value) =>
		dispatch(setSetting(stackingType, setting, key, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StackSetting);
