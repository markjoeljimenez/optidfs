import { SET_CSV } from './Upload.actions';

const TabsReducer = (state = null, { type, file }) => {
	switch (type) {
		case SET_CSV:
			return file ?? state;

		default:
			return state;
	}
};

export default TabsReducer;
