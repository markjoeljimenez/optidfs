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
	function handleSpacing(e: ChangeEvent<HTMLInputElement>) {
		const value = parseInt(e.currentTarget.value);

		setStackingSetting(STACKING_SETTINGS.SPACING, undefined, value);
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
