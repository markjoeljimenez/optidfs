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
								value: sport.sportId,
								label: sport.regionAbbreviatedSportName,
							} as IValueLabel)
					)}
				value={sports.selectedSport?.sportId.toString() || ''}
				hideLabel
				id="selectSport"
				label="Select sport"
				placeholder="Select sport"
				disabled={!response.data}
				onChange={handleSportChange}
				testId="sports-select"
			/>
		</div>
	);
};

export default Sports;
