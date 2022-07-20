import { ChangeEvent, useEffect, useState } from 'react';
import { useAppLocalStorage } from 'src/hooks/useAppLocalStorage';

import Select from '../../../components/form/select';
import providersData from '../../../data/providers';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectProviders, setProvider } from '..';

const Providers = () => {
	const providers = useAppSelector(selectProviders);
	const [localStorage, setLocalStorage] = useAppLocalStorage();
	const dispatch = useAppDispatch();

	const handleProviderSelection = (e: ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.currentTarget;

		dispatch(setProvider(value));

		setLocalStorage({
			...localStorage,
			provider: value,
		});
	};

	// useEffect(() => {
	// 	if (providers.provider) {
	// 		setLocalStorage({
	// 			...localStorage,
	// 			provider: providers.provider,
	// 		});
	// 	}
	// }, [providers.provider]);

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
