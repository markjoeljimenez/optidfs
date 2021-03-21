import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { FETCH_CONTESTS } from '../Dropdown/Dropdown.actions';

const Sports = () => {
	const { allSports } = useAppSelector(
		(state) => state.sports
	);
	const dispatch = useDispatch();

	const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = parseInt(e.currentTarget.value);

		dispatch({
			type: FETCH_CONTESTS,
			sport: value,
		});
	};

	return (
		<div className="relative">
			<label htmlFor="selectSport">
				<span className="sr-only">Select Sport</span>
				<select
					defaultValue="0"
					onChange={handleSportChange}
					className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 pr-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs md:text-base"
					id="selectSport"
				>
					<option value="0" disabled>
						Select Sport
					</option>
					{allSports
						?.filter(
							(sport) =>
								sport.isEnabled &&
								sport.hasPublicContests &&
								sport.supported
						)
						.map((sport) => (
							<option value={sport.sportId} key={sport.sportId}>
								{sport.regionAbbreviatedSportName}
							</option>
						))}
				</select>
			</label>

			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
				<svg
					className="fill-current"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="24"
					height="24"
				>
					<g data-name="Layer 2">
						<g data-name="chevron-down">
							<rect width="24" height="24" opacity="0" />
							<path d="M12 15.5a1 1 0 0 1-.71-.29l-4-4a1 1 0 1 1 1.42-1.42L12 13.1l3.3-3.18a1 1 0 1 1 1.38 1.44l-4 3.86a1 1 0 0 1-.68.28z" />
						</g>
					</g>
				</svg>
			</div>
		</div>
	);
};

export default Sports;
