import { SET_RULE } from './Rules.actions';

interface IRules {
	NUMBER_OF_PLAYERS_FROM_SAME_TEAM?: {
		key: string;
		value: number;
	}[];
	NUMBER_OF_SPECIFIC_POSITIONS?: {
		key: string;
		value: number;
	}[];
}

const RulesReducer = (state: IRules = {}, { type, rule, key, value }) => {
	switch (type) {
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
				(pos) => pos.team === key
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

		default:
			return state;
	}
};

export default RulesReducer;
