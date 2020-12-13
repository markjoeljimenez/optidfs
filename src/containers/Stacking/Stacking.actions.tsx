export const SET_SETTING = 'SET_SETTING';
export const REMOVE_FROM_SETTING = 'REMOVE_FROM_SETTING';
export const STACKING_TYPE = {
	TEAM: 'TEAM',
	POSITION: 'POSITION',
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
};

export const setSetting = (
	stackingType: string,
	setting: string,
	key: string,
	value: string | number | string[] | number[]
) => ({
	type: SET_SETTING,
	stackingType,
	setting,
	key,
	value,
});

export const removeSetting = (
	stackingType: string,
	setting: string,
	key: string
) => ({
	type: REMOVE_FROM_SETTING,
	stackingType,
	setting,
	key,
});
