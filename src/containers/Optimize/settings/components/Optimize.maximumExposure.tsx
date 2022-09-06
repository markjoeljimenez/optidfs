import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks';

import Input from '@/components/form/input';

import { setMaximumExposure } from '../../reducers/Optimize.reducers';

const OptimizeMaximumExposureForAllPlayers = () => {
	const { optimize } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	function handleMaximumExposure(e: ChangeEvent<HTMLInputElement>) {
		dispatch(setMaximumExposure(parseFloat(e.currentTarget.value)));
	}

	return (
		<Input
			defaultValue={optimize.settings.maximumExposure}
			id="max-exposure"
			label="Max exposure (all players)"
			max={1}
			min={0}
			step={0.1}
			testid="max-exposure"
			type="number"
			onChange={handleMaximumExposure}
		/>
	);
};

export default OptimizeMaximumExposureForAllPlayers;
