export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';

const setActiveTab = (activeTab: string) => ({
	type: SET_ACTIVE_TAB,
	activeTab,
});

export default setActiveTab;
