import { LOADING_CONTESTS, SET_CONTESTS } from './Dropdown.actions';

const DEFAULT_STATE = {
	loading: false,
	message: null,
};

const dropdown = (state = DEFAULT_STATE, { type, contests, message }) => {
	switch (type) {
		case LOADING_CONTESTS:
			return {
				...state,
				loading: true,
				message,
			};

		case SET_CONTESTS:
			// console.log(contests[0]);
			return {
				...state,
				contests,
				loading: false,
				message: null,
			};

		default:
			return state;
	}
};

export default dropdown;
