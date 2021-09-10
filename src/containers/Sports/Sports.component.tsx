import { useDispatch } from 'react-redux';
import Select from '../../components/form/select';
import { useAppSelector } from '../../hooks';

import { DROPDOWN_ACTIONS } from '../Dropdown/Dropdown.actions';

const Sports = () => {
	const { allSports } = useAppSelector((state) => state.sports);
	const dispatch = useDispatch();

	function handleSportChange(e: React.ChangeEvent<HTMLSelectElement>) {
		const sport = parseInt(e.currentTarget.value);

		dispatch({
			type: DROPDOWN_ACTIONS.FETCH_CONTESTS,
			sport,
		});
	}

	return (
		<div className="relative">
			<Select
				options={allSports
					?.filter(
						(sport) =>
							sport.isEnabled &&
							sport.hasPublicContests &&
							sport.supported
					)
					.map((sport) => ({
						value: sport.sportId,
						label: sport.regionAbbreviatedSportName,
					}))}
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
