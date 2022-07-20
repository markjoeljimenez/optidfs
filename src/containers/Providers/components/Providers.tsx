import { ChangeEvent } from 'react';

import Select from '../../../components/form/select';
import providersData from '../../../data/providers';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectProviders, setProvider } from '..';

const Providers = () => {
	const providers = useAppSelector(selectProviders);
	const dispatch = useAppDispatch();

	const handleProviderSelection = (e: ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.currentTarget;

		dispatch(setProvider(value));
	};

	return (
		<Select
			hideLabel
			id="selectProvider"
			label="Select provider"
			options={providersData.map((sport) => ({
				label: sport.name,
				value: sport.id,
			}))}
			placeholder="Select provider"
			testId="provider-select"
			value={providers.provider ?? ''}
			onChange={handleProviderSelection}
		/>
	);
};

export default Providers;
