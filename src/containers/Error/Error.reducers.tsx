export const SET_ERROR = 'SET_ERROR';

const DEFAULT_STATE = null;

const dropdown = (state = DEFAULT_STATE, { type, error }) => {
	switch (type) {
		case SET_ERROR:
			return error;

		default:
			return state;
	}
};

export default dropdown;
