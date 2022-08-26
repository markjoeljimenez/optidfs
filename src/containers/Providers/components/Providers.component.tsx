import { ChangeEvent } from 'react';
import { OptidfsApi } from 'src/api';
import useReset from 'src/hooks/useReset';

import Select from '@/components/form/select';
import { setSelectedContest } from '@/containers/Contests';
import { setSelectedSport } from '@/containers/Sports';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { EProviders, providersData, setProvider } from '..';

export const Providers = () => {
	const { global, providers } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const reset = useReset();

	const handleProviderSelection = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = e.currentTarget.value as EProviders;

		dispatch(setProvider(value));

		if (global.hasVisited) {
			reset([setSelectedContest, setSelectedSport]);

			dispatch(OptidfsApi.util.resetApiState());
		}
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
