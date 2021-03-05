import { LOADING_CONTESTS, SET_CONTESTS } from './Dropdown.actions';

const DEFAULT_STATE = {
	loading: false,
	error: null,
};

const dropdown = (state = DEFAULT_STATE, { type, contests }) => {
	switch (type) {
		case LOADING_CONTESTS:
			return {
				...state,
				loading: true,
				message: 'Loading contests... This may take a while.',
			};

		case SET_CONTESTS:
			return {
				...state,
				contests,
				loading: false,
				message: null,
				error: null,
			};

		default:
			return state;
	}
};

export default dropdown;
