export const OPEN_MODAL = 'OPEN_MODAL';
export const SET_RULE = 'SET_RULE';
export const REMOVE_RULE = 'REMOVE_RULE';
export const RULE = {
	NUMBER_OF_GENERATIONS: 'NUMBER_OF_GENERATIONS',
	NUMBER_OF_PLAYERS_FROM_SAME_TEAM: 'NUMBER_OF_PLAYERS_FROM_SAME_TEAM',
	NUMBER_OF_SPECIFIC_POSITIONS: 'NUMBER_OF_SPECIFIC_POSITIONS',
	MINIMUM_SALARY_CAP: 'MINIMUM_SALARY_CAP',
	MAX_REPEATING_PLAYERS: 'MAX_REPEATING_PLAYERS',
	MIN_PROJECTED_OWNERSHIP: 'MIN_PROJECTED_OWNERSHIP',
	MAX_PROJECTED_OWNERSHIP: 'MAX_PROJECTED_OWNERSHIP',
};
export const RESET_RULES = 'RESET_RULES';
export const SET_RULE_ERROR = 'SET_RULE_ERROR';
export const REMOVE_RULE_ERROR = 'REMOVE_RULE_ERROR';

export const openModal = (active: boolean) => ({
	type: OPEN_MODAL,
	active,
});

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

export const setRuleError = (rule: string, value: string) => ({
	type: SET_RULE_ERROR,
	rule,
	value,
});

export const removeRuleError = (rule: string) => ({
	type: REMOVE_RULE_ERROR,
	rule,
});

export const resetRules = () => ({
	type: RESET_RULES,
});
