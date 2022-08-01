import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks';

import Input from '@/components/form/input';

import { setNumberOfGenerations } from '../../redux/Optimize.reducers';

const OptimizeNumberOfGenerations = () => {
	const { optimize } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	function handleNumberOfLineupsChange(e: ChangeEvent<HTMLInputElement>) {
		dispatch(setNumberOfGenerations(parseInt(e.currentTarget.value)));
	}

	return (
		<Input
			defaultValue={optimize.settings.numberOfLineups}
			id="number-of-generations"
			label="Number of generations"
			min={1}
			type="number"
			onChange={handleNumberOfLineupsChange}
		/>
	);
};

export default OptimizeNumberOfGenerations;
