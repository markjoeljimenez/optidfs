import { ChangeEvent } from 'react';

import Input from '../../../../components/form/input';
import { useAppDispatch } from '../../../../hooks';
import {
	setSetting,
	STACKING_TEAM_SETTINGS,
	STACKING_TYPE,
} from '../../Stacking.actions';

const StackSetting = () => {
	const dispatch = useAppDispatch();

	function handleMaxExposure(e: ChangeEvent<HTMLInputElement>) {
		const value = parseFloat(e.currentTarget.value);

		dispatch(
			setSetting(
				STACKING_TYPE.TEAM,
				STACKING_TEAM_SETTINGS.MAX_EXPOSURE,
				undefined,
				value
			)
		);
	}

	return (
		<Input
			id="maxExposure"
			label="Max Exposure"
			max={1}
			min={0}
			onChange={handleMaxExposure}
			placeholder="0"
			step={0.1}
			type="number"
		/>
	);
};

export default StackSetting;
