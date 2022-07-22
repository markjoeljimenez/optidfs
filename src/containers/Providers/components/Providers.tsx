import { ChangeEvent } from 'react';
import useReset from 'src/hooks/useReset';

import { setSelectedContest } from '@/containers/Contests';
import { setDefaultPlayers } from '@/containers/Players';
import { setSelectedSport } from '@/containers/Sports';

import Select from '../../../components/form/select';
import providersData from '../../../data/providers';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setProvider } from '..';

const Providers = () => {
	const { global, providers } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const reset = useReset();

	const handleProviderSelection = (e: ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.currentTarget;

		dispatch(setProvider(value));

		if (global.hasVisited) {
			reset([setSelectedContest, setDefaultPlayers, setSelectedSport]);
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

export default Providers;
