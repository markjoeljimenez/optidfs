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
			options={providersData.map((sport) => ({
				value: sport.id,
				label: sport.name,
			}))}
			value={providers.provider ?? ''}
			hideLabel
			id="selectProvider"
			label="Select provider"
			placeholder="Select provider"
			onChange={handleProviderSelection}
			testId="provider-select"
		/>
	);
};

export default Providers;
