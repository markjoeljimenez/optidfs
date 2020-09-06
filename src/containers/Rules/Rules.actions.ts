export const SET_RULE = 'SET_RULE';
export const REMOVE_RULE = 'REMOVE_RULE';
export const RULE = {
	NUMBER_OF_PLAYERS_FROM_SAME_TEAM: 'NUMBER_OF_PLAYERS_FROM_SAME_TEAM',
	NUMBER_OF_SPECIFIC_POSITIONS: 'NUMBER_OF_SPECIFIC_POSITIONS',
	MINIMUM_SALARY_CAP: 'MINIMUM_SALARY_CAP',
	MAX_REPEATING_PLAYERS: 'MAX_REPEATING_PLAYERS',
	PROJECTED_OWNERSHIP: 'PROJECTED_OWNERSHIP',
};
export const RESET_RULES = 'RESET_RULES';

export const setRule = (rule: string, key: string, value: number) => ({
	type: SET_RULE,
	rule,
	key,
	value,
});

export const removeRule = (rule: string, key: string) => ({
	type: REMOVE_RULE,
	rule,
	key,
});

export const resetRules = () => ({
	type: RESET_RULES,
});
