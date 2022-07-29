import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks';

import Input from '@/components/form/input';

import {
	optimizedState,
	setNumberOfGenerations,
} from '../../redux/Optimize.reducers';

const OptimizeSettings = () => {
	const { settings } = useAppSelector(optimizedState);
	const dispatch = useAppDispatch();

	function handleNumberOfLineupsChange(e: ChangeEvent<HTMLInputElement>) {
		dispatch(setNumberOfGenerations(parseInt(e.currentTarget.value)));
	}

	return (
		<Input
			id="number-of-generations"
			label="Number of generations"
			type="number"
			value={settings.numberOfLineups}
			onChange={handleNumberOfLineupsChange}
		/>
	);
};

export default OptimizeSettings;
