import { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import InputGroup from '../../../components/form/inputGroup';

import {
	setSetting,
	STACKING_TEAM_SETTINGS,
	STACKING_TYPE,
} from '../Stacking.actions';

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
	function handleMaxExposure(e: ChangeEvent<HTMLInputElement>) {
		const value = parseFloat(e.currentTarget.value);

		setStackingSetting(
			STACKING_TYPE.TEAM,
			STACKING_TEAM_SETTINGS.MAX_EXPOSURE,
			undefined,
			value
		);
	}

	return (
		<InputGroup label="Max Exposure">
			<label htmlFor="maxExposure">
				<span className="sr-only">Max Exposure</span>
				<input
					className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="maxExposure"
					placeholder="0"
					type="number"
					step={0.1}
					max={1}
					min={0.1}
					onChange={handleMaxExposure}
				/>
			</label>
		</InputGroup>
	);
};

const mapStateToProps = ({ stacking }) => ({
	inputValue: stacking.TEAM?.MAX_EXPOSURE,
});

const mapDispatchToProps = (dispatch) => ({
	setStackingSetting: (stackingType, setting, key, value) =>
		dispatch(setSetting(stackingType, setting, key, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StackSetting);
