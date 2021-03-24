import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../../hooks';

import {
	setSetting,
	STACKING_TEAM_SETTINGS,
	STACKING_TYPE,
} from '../../Stacking.actions';

import InputGroup from '../../../../components/form/inputGroup';

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
		<InputGroup label="Spacing">
			<label htmlFor="spacing">
				<span className="sr-only">Spacing</span>
				<input
					className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="spacing"
					placeholder="0"
					type="number"
					min={0}
					onChange={handleSpacing}
				/>
			</label>
		</InputGroup>
	);
};

export default StackSetting;
