import { useAppDispatch, useAppSelector } from '../../../hooks';
import Select, { IValueLabel } from '../../../components/form/select';
import { sportsState, setSelectedSport } from '../redux/reducers';
import { useGetSportsFromProviderQuery } from '../../../api';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { selectProviders } from '@/containers/Providers';

const Sports = () => {
	const dispatch = useAppDispatch();
	const providers = useAppSelector(selectProviders);
	const sports = useAppSelector(sportsState);

	const test = useGetSportsFromProviderQuery(providers.provider ?? skipToken);

	// console.log(providers.provider, test);

	function handleSportChange(e: React.ChangeEvent<HTMLSelectElement>) {
		const sportId = parseInt(e.currentTarget.value);
		const selectedSport = test.data?.find(
			(sport) => sport.sportId === sportId
		);

		if (selectedSport) {
			dispatch(setSelectedSport(selectedSport));
		}

		// dispatch({
		// 	type: PLAYERS_ACTIONS.RESET_PLAYERS,
		// });

		// dispatch({
		// 	type: DROPDOWN_ACTIONS.RESET,
		// });

		// dispatch({
		// 	type: TABLE_ACTIONS.RESET,
		// });
	}

	return (
		<div className="relative">
			<Select
				options={(test.data ?? [])
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
				disabled={!test.data}
				onChange={handleSportChange}
				testId="sports-select"
			/>
		</div>
	);
};

export default Sports;
