import { selectProviders } from '@/containers/Providers';

import { useGetSportsFromProviderQuery } from '../../../api';
import Select, { IValueLabel } from '../../../components/form/select';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setSelectedSport, sportsState } from '../redux/reducers';

const Sports = () => {
	const providers = useAppSelector(selectProviders);
	const sports = useAppSelector(sportsState);
	const dispatch = useAppDispatch();

	const response = useGetSportsFromProviderQuery(providers.provider!, {
		skip: !providers.provider,
	});

	function handleSportChange(e: React.ChangeEvent<HTMLSelectElement>) {
		const sportId = parseInt(e.currentTarget.value);
		const selectedSport = response.data?.find(
			(sport) => sport.sportId === sportId
		);

		if (selectedSport) {
			dispatch(setSelectedSport(selectedSport));
		}
	}

	return (
		<div className="relative">
			<Select
				hideLabel
				disabled={!response.data}
				id="selectSport"
				label="Select sport"
				options={(response.data ?? [])
					.filter(
						(sport) =>
							sport.isEnabled &&
							sport.hasPublicContests &&
							sport.supported
					)
					.sort((a, b) =>
						a.regionAbbreviatedSportName.localeCompare(
							b.regionAbbreviatedSportName
						)
					)
					.map(
						(sport) =>
							({
								label: sport.regionAbbreviatedSportName,
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
