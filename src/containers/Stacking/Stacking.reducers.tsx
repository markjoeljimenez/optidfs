import { SET_SETTING } from './Stacking.actions';

interface IStacking {
	NUMBER_OF_PLAYERS_TO_STACK?: number;
}

const StackingReducer = (
	state: IStacking = {},
	{ type, setting, key, value }
) => {
	switch (type) {
		case SET_SETTING: {
			console.log(value);
			if (!value || key === '') {
				return state;
			}

			// If key is undefined,
			// We're going to assume that there is no key/value object pair to mutate
			// Simply assign the rule the value
			if (!key) {
				return {
					...state,
					[setting]: value,
				};
			}

			// If the rule doesn't originally exist,
			// Add it and the current key/value
			if (!state[setting]) {
				return {
					...state,
					[setting]: [
						{
							key,
							value,
						},
					],
				};
			}

			// If the user has modified the value of an already existing team,
			// Find it
			const existingRule = state[setting]?.findIndex(
				(_rule) => _rule.key === key
			);

			// If existingRule doesn't exist,
			// Add it and the current key/value
			if (existingRule === -1) {
				return {
					...state,
					[setting]: [
						...state[setting],
						{
							key,
							value,
						},
					],
				};
			}

			// Create new array due to unmutable state
			const PREV_STATE = [...state[setting]];

			// Replace position of existingRule with new value
			PREV_STATE[existingRule] = {
				...PREV_STATE[existingRule],
				value,
			};

			return {
				...state,
				[setting]: PREV_STATE,
			};
		}

		default:
			return state;
	}
};

export default StackingReducer;
