import { IMEPT } from './components/Position/Stacking.position.maxExposurePerTeam';
import { ICustomStack } from './Stacking.reducers';

export const SET_SETTING = 'SET_SETTING';
export const REMOVE_FROM_SETTING = 'REMOVE_FROM_SETTING';
export const RESET_SETTINGS = 'RESET_SETTINGS';
export const SET_SETTING_ERROR = 'SET_SETTING_ERROR';
export const STACKING_TYPE = {
	TEAM: 'TEAM',
	POSITION: 'POSITION',
	CUSTOM: 'CUSTOM',
};
export const STACKING_TEAM_SETTINGS = {
	NUMBER_OF_PLAYERS_TO_STACK: 'NUMBER_OF_PLAYERS_TO_STACK',
	FROM_TEAMS: 'FROM_TEAMS',
	FROM_POSITIONS: 'FROM_POSITIONS',
	SPACING: 'SPACING',
	MAX_EXPOSURE: 'MAX_EXPOSURE',
	MAX_EXPOSURE_PER_TEAM: 'MAX_EXPOSURE_PER_TEAM',
};
export const STACKING_POSITION_SETTINGS = {
	NUMBER_OF_POSITIONS: 'NUMBER_OF_POSITIONS',
	OPTIONAL_POSITIONS: 'OPTIONAL_POSITIONS',
	FOR_TEAMS: 'FOR_TEAMS',
	MAX_EXPOSURE: 'MAX_EXPOSURE',
	MAX_EXPOSURE_PER_TEAM: 'MAX_EXPOSURE_PER_TEAM',
};
export const STACKING_CUSTOM_SETTINGS = {
	STACKS: 'STACKS',
};
export const SET_STACKING_ACTIVE_TAB = 'SET_STACKING_ACTIVE_TAB';

export const setSetting = (
	stackingType: string,
	setting: string,
	key?: string,
	value?: any
) => ({
	type: SET_SETTING,
	stackingType,
	setting,
	key,
	value,
});

export const removeFromSetting = (
	stackingType: string,
	setting: string,
	key: string
) => ({
	type: REMOVE_FROM_SETTING,
	stackingType,
	setting,
	key,
});

// export const setSettingError = (stackingType: string, setting: string) => ({
// 	type: SET_SETTING_ERROR,
// 	stackingType,
// 	setting,
// });

export const resetSettings = () => ({
	type: RESET_SETTINGS,
});

export const setActiveStackingTab = (activeTab: string) => ({
	type: SET_STACKING_ACTIVE_TAB,
	activeTab,
});
