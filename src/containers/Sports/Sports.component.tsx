import { DROPDOWN_ACTIONS } from '../Dropdown/Dropdown.actions';
import { PLAYERS_ACTIONS } from '../Players/Players.actions';
import { TABLE_ACTIONS } from '../Table/Table.actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Select, { IValueLabel } from '../../components/form/select';
import { selectSports, setSelectedSport } from './Sports.reducers';
import { useGetSportsFromProviderQuery } from '../../api';
import { selectProviders } from '../Providers/Providers.reducers';
import { skipToken } from '@reduxjs/toolkit/dist/query';

const Sports = () => {
	const dispatch = useAppDispatch();
	const providers = useAppSelector(selectProviders);
	const sports = useAppSelector(selectSports);

	const { data } = useGetSportsFromProviderQuery(
		providers.provider ?? skipToken
	);

	function handleSportChange(e: React.ChangeEvent<HTMLSelectElement>) {
		const sportId = parseInt(e.currentTarget.value);
		const selectedSport = data?.find((sport) => sport.sportId === sportId);

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
				options={(data ?? [])
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
				disabled={!data}
				onChange={handleSportChange}
			/>
		</div>
	);
};

export default Sports;
