import uniqBy from 'lodash.uniqby';

import {
	OPEN_MODAL,
	REMOVE_RULE,
	REMOVE_RULE_ERROR,
	RESET_RULES,
	SET_RULE,
	SET_RULE_ERROR,
} from './Rules.actions';

interface IRules {
	NUMBER_OF_PLAYERS_TO_STACK_FROM_SAME_TEAM?: {
		key: string;
		value: number;
	}[];
	NUMBER_OF_GENERATIONS: number;
	NUMBER_OF_SPECIFIC_POSITIONS?: {
		key: string;
		value: number;
	}[];
	errors?: {
		rule: string;
		value: number;
	}[];
}

const DEFAULT_STATE: IRules = {
	NUMBER_OF_GENERATIONS: 1,
};

const RulesReducer = (
	state = DEFAULT_STATE,
	{ type, rule, key, value, active }
) => {
	switch (type) {
		case OPEN_MODAL:
			return {
				...state,
				active: active ?? false,
			};

		case SET_RULE: {
			if (!value || key === '') {
				return state;
			}

			// If key is undefined,
			// We're going to assume that there is no key/value object pair to mutate
			// Simply assign the rule the value
			if (!key) {
				return {
					...state,
					[rule]: value,
				};
			}

			// If the rule doesn't originally exist,
			// Add it and the current key/value
			if (!state[rule]) {
				return {
					...state,
					[rule]: [
						{
							key,
							value,
						},
					],
				};
			}

			// If the user has modified the value of an already existing team,
			// Find it
			const existingRule = state[rule]?.findIndex(
				(_rule) => _rule.key === key
			);

			// If existingRule doesn't exist,
			// Add it and the current key/value
			if (existingRule === -1) {
				return {
					...state,
					[rule]: [
						...state[rule],
						{
							key,
							value,
						},
					],
				};
			}

			// Create new array due to unmutable state
			const PREV_STATE = [...state[rule]];

			// Replace position of existingRule with new value
			PREV_STATE[existingRule] = {
				...PREV_STATE[existingRule],
				value,
			};

			return {
				...state,
				[rule]: PREV_STATE,
			};
		}

		case REMOVE_RULE: {
			const rules = state[rule].filter((_rule) => _rule.key !== key);

			return {
				...state,
				[rule]: rules.length ? rules : undefined,
			};
		}

		case SET_RULE_ERROR:
			return {
				...state,
				errors: state.errors
					? uniqBy(
							[
								...state.errors,
								{
									rule,
									value,
								},
							],
							{ rule }
					  )
					: [
							{
								rule,
								value,
							},
					  ],
			};

		case REMOVE_RULE_ERROR: {
			const filter = state.errors?.filter((error) => error.rule !== rule);

			return {
				...state,
				errors: filter,
			};
		}

		case RESET_RULES:
			return DEFAULT_STATE;

		default:
			return state;
	}
};

export default RulesReducer;
