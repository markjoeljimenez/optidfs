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
	function handleSpacing(e: ChangeEvent<HTMLInputElement>) {
		const value = parseInt(e.currentTarget.value);

		setStackingSetting(
			STACKING_TYPE.TEAM,
			STACKING_TEAM_SETTINGS.SPACING,
			undefined,
			value
		);
	}

	return (
		<div>
			<span className="inline-block mb-2 text-xs uppercase font-black">
				Spacing
			</span>
			<label htmlFor="spacing">
				<span className="sr-only">Spacing</span>
				<input
					className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="spacing"
					placeholder="0"
					type="number"
					// min={0}
					onChange={handleSpacing}
					// value={inputValue || ''}
				/>
			</label>
		</div>
	);
};

const mapStateToProps = ({ stacking }) => ({
	inputValue: stacking.TEAM?.SPACING,
});

const mapDispatchToProps = (dispatch) => ({
	setStackingSetting: (stackingType, setting, key, value) =>
		dispatch(setSetting(stackingType, setting, key, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StackSetting);
