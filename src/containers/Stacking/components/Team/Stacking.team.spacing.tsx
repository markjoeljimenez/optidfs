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
			id="spacing"
			label="Spacing"
			min={0}
			placeholder="0"
			type="number"
			onChange={handleSpacing}
		/>
	);
};

export default StackSetting;
