import { useDispatch } from 'react-redux';
import Select, { IValueLabel } from '../../components/form/select';
import { useAppSelector } from '../../hooks';

import { DROPDOWN_ACTIONS } from '../Dropdown/Dropdown.actions';

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
				defaultValue=""
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
