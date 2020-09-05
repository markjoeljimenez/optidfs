import { SET_SPORT } from './Header.actions';

const header = (state = {}, { type, sport }) => {
	switch (type) {
		// case SET_SPORT:
		// 	return {
		// 		...state,
		// 		sport,
		// 	};

		default:
			return state;
	}
};

export default header;
