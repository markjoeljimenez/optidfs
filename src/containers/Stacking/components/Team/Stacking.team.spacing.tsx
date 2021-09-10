import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../../hooks';

import {
	setSetting,
	STACKING_TEAM_SETTINGS,
	STACKING_TYPE,
} from '../../Stacking.actions';

import Input from '../../../../components/form/input';

const StackSetting = () => {
	const dispatch = useAppDispatch();

	function handleSpacing(e: ChangeEvent<HTMLInputElement>) {
		const value = parseInt(e.currentTarget.value);

		dispatch(
			setSetting(
				STACKING_TYPE.TEAM,
				STACKING_TEAM_SETTINGS.SPACING,
				undefined,
				value
			)
		);
	}

	return (
		<Input
			label="Spacing"
			id="spacing"
			placeholder="0"
			onChange={handleSpacing}
			type="number"
			min={0}
		/>
	);
};

export default StackSetting;
