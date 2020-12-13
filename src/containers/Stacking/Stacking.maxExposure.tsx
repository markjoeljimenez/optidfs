import { ChangeEvent } from 'react';
import { connect } from 'react-redux';

import { setSetting, STACKING_SETTINGS } from './Stacking.actions';

interface IStackingSetting {
	setStackingSetting(
		setting: string,
		key: string | undefined,
		value: number
	): void;
}

const StackSetting = ({ setStackingSetting }: IStackingSetting) => {
	function handleMaxExposure(e: ChangeEvent<HTMLInputElement>) {
		const value = parseFloat(e.currentTarget.value);

		setStackingSetting(STACKING_SETTINGS.MAX_EXPOSURE, undefined, value);
	}

	return (
		<div>
			<span className="inline-block mb-2 text-xs uppercase font-black">
				Max Exposure
			</span>
			<label htmlFor="maxExposure">
				<span className="sr-only">Max Exposure</span>
				<input
					className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="maxExposure"
					placeholder="0"
					type="number"
					step={0.1}
					max={1}
					// min={0}
					onChange={handleMaxExposure}
				/>
			</label>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setStackingSetting: (setting, key, value) =>
		dispatch(setSetting(setting, key, value)),
});

export default connect(null, mapDispatchToProps)(StackSetting);
