import { SET_ACTIVE_TAB } from './Tabs.actions';

const DEFAULT_STATE = {
	activeTab: 'players',
};

const TabsReducer = (state = DEFAULT_STATE, { type, activeTab }) => {
	switch (type) {
		case SET_ACTIVE_TAB:
			return {
				...state,
				activeTab,
			};

		default:
			return state;
	}
};

export default TabsReducer;
