import { SET_CONTESTS } from './Dropdown.actions';

const dropdown = (state = {}, { type, contests, sport }) => {
	switch (type) {
		case SET_CONTESTS:
			return {
				...state,
				contests,
				sport,
			};

		default:
			return state;
	}
};

export default dropdown;
