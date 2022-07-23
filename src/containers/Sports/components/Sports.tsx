import useReset from 'src/hooks/useReset';

import Select, { IValueLabel } from '@/components/form/select';
import { setSelectedContest } from '@/containers/Contests';
import { setDefaultPlayers } from '@/containers/Players';

import { useGetSportsFromProviderQuery, usePrefetch } from '../../../api';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setSelectedSport } from '../redux/Sports.reducers';

const Sports = () => {
	const { global, providers, sports } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const reset = useReset();
	const prefetchGetContestsFromSport = usePrefetch('getContestsFromSport');

	const { data } = useGetSportsFromProviderQuery(providers.provider!, {
		skip: !providers.provider,
	});

	function handleSportChange(e: React.ChangeEvent<HTMLSelectElement>) {
		const sportId = isNaN(parseInt(e.currentTarget.value))
			? e.currentTarget.value
			: parseInt(e.currentTarget.value);

		const selectedSport = data?.find((sport) => sport.sportId === sportId);

		if (selectedSport) {
			dispatch(setSelectedSport(selectedSport));

			// Reset contests and players
			if (global.hasVisited) {
				reset([setSelectedContest, setDefaultPlayers]);
			}

			prefetchGetContestsFromSport({
				provider: providers.provider,
				sport: selectedSport?.regionAbbreviatedSportName,
				sportId: selectedSport?.sportId,
			});
		}
	}

	return (
		<div className="relative">
			<Select
				hideLabel
				disabled={!data}
				id="selectSport"
				label="Select sport"
				options={(data ?? [])
					.filter(
						(sport) =>
							sport.isEnabled &&
							sport.hasPublicContests &&
							sport.supported
					)
					.sort((a, b) => a.fullName.localeCompare(b.fullName))
					.map(
						(sport) =>
							({
								label: (
									sport.regionAbbreviatedSportName ??
									sport.fullName
								).toLocaleUpperCase(),
								value: sport.sportId,
							} as IValueLabel)
					)}
				placeholder="Select sport"
				testId="sports-select"
				value={sports.selectedSport?.sportId.toString() || ''}
				onChange={handleSportChange}
			/>
		</div>
	);
};

export default Sports;
