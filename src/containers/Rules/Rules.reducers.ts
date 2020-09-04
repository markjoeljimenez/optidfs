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

const RulesReducer = (state: IRules = {}, { type, key, rule, value }) => {
	switch (type) {
		case SET_RULE: {
			if (!value || key === '') {
				return state;
			}

			// If the rules doesn't originally exist,
			// Add it and the current key/value
			if (!state[rule]) {
				return {
					...state,
					[rule]: [
						{
							key,
							value: parseInt(value),
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
							value: parseInt(value),
						},
					],
				};
			}

			// Create new array due to unmutable state
			const PREV_STATE = [...state[rule]];

			PREV_STATE[existingRule] = {
				...PREV_STATE[existingRule],
				value: parseInt(value),
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
