import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../../hooks';

import {
	setSetting,
	STACKING_POSITION_SETTINGS,
	STACKING_TYPE,
} from '../../Stacking.actions';

import Input from '../../../../components/form/input';

const StackSetting = () => {
	const dispatch = useAppDispatch();

	function handleMaxExposure(e: ChangeEvent<HTMLInputElement>) {
		const value = parseFloat(e.currentTarget.value);

		dispatch(
			setSetting(
				STACKING_TYPE.POSITION,
				STACKING_POSITION_SETTINGS.MAX_EXPOSURE,
				undefined,
				value
			)
		);
	}

	return (
		<Input label="Max Exposure">
			<label htmlFor="positionsMaxExposure">
				<span className="sr-only">Max Exposure</span>
				<input
					className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="positionsMaxExposure"
					placeholder="0"
					type="number"
					step={0.1}
					max={1}
					min={0.1}
					onChange={handleMaxExposure}
				/>
			</label>
		</Input>
	);
};

export default StackSetting;
