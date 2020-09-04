export const SET_RULE = 'SET_RULE';
export const RULE = {
	NUMBER_OF_PLAYERS_FROM_SAME_TEAM: 'NUMBER_OF_PLAYERS_FROM_SAME_TEAM',
	NUMBER_OF_SPECIFIC_POSITIONS: 'NUMBER_OF_SPECIFIC_POSITIONS',
	MINIMUM_SALARY_CAP: 'MINIMUM_SALARY_CAP',
};

export const setRule = (rule: string, key: string, value: string) => ({
	type: SET_RULE,
	rule,
	key,
	value: parseInt(value),
});
