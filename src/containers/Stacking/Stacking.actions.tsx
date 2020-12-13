export const SET_SETTING = 'SET_SETTING';
export const STACKING_SETTINGS = {
	NUMBER_OF_PLAYERS_TO_STACK: 'NUMBER_OF_PLAYERS_TO_STACK',
	FROM_TEAMS: 'FROM_TEAMS',
	FROM_POSITIONS: 'FROM_POSITIONS',
};

export const setSetting = (
	setting: string,
	key: string,
	value: string | number | string[] | number[]
) => ({
	type: SET_SETTING,
	setting,
	key,
	value,
});
