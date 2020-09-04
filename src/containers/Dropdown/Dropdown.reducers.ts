import { SET_CONTESTS } from './Dropdown.actions';

const dropdown = (state = {}, { type, contests }) => {
	switch (type) {
		case SET_CONTESTS:
			return {
				...state,
				contests,
			};

		default:
			return state;
	}
};

export default dropdown;
