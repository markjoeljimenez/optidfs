export const SET_RULE = 'SET_RULE';
export const RULE = {
	NUMBER_OF_PLAYERS_FROM_SAME_TEAM: 'NUMBER_OF_PLAYERS_FROM_SAME_TEAM',
	NUMBER_OF_SPECIFIC_POSITIONS: 'NUMBER_OF_SPECIFIC_POSITIONS',
};

export const setRule = (rule: string, key: string, value: number) => ({
	type: SET_RULE,
	rule,
	key,
	value,
});
