import { DROPDOWN_ACTIONS } from '../Dropdown/Dropdown.actions';
import { PLAYERS_ACTIONS } from '../Players/Players.actions';
import { TABLE_ACTIONS } from '../Table/Table.actions';
import { useAppSelector } from '../../hooks';
import { useDispatch } from 'react-redux';
import Select, { IValueLabel } from '../../components/form/select';

const Sports = () => {
	const { sports } = useAppSelector((state) => state);
	const dispatch = useDispatch();

	function handleSportChange(e: React.ChangeEvent<HTMLSelectElement>) {
		const sportId = parseInt(e.currentTarget.value);

		dispatch({
			type: DROPDOWN_ACTIONS.FETCH_CONTESTS,
			sport: sports.allSports.find(
				(_sport) => _sport.sportId === sportId
			),
		});

		dispatch({
			type: PLAYERS_ACTIONS.RESET_PLAYERS,
		});

		dispatch({
			type: DROPDOWN_ACTIONS.RESET,
		});

		dispatch({
			type: TABLE_ACTIONS.RESET,
		});
	}

	return (
		<div className="relative">
			<Select
				options={sports.allSports
					?.filter(
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
				onChange={handleSportChange}
			/>
		</div>
	);
};

export default Sports;
