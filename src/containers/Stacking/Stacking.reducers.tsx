import { TABS } from './Stacking';
import {
	REMOVE_FROM_SETTING,
	RESET_SETTINGS,
	SET_SETTING,
	SET_SETTING_ERROR,
	SET_STACKING_ACTIVE_TAB,
} from './Stacking.actions';

interface IStackingState {
	activeTab: string;
	TEAM?: {
		NUMBER_OF_PLAYERS_TO_STACK: string;
		FROM_TEAMS: string;
		FROM_POSITIONS: string;
		SPACING: string;
		MAX_EXPOSURE: string;
		MAX_EXPOSURE_PER_TEAM: string;
	};
	POSITION?: {};
}

const DEFAULT_STATE: IStackingState = {
	activeTab: TABS[0].id,
};

const StackingReducer = (
	state = DEFAULT_STATE,
	{ type, setting, key, value, stackingType, activeTab }
) => {
	switch (type) {
		case SET_SETTING: {
			if (!value || !stackingType || key === '') {
				return state;
			}

			// If key is undefined,
			// We're going to assume that there is no key/value object pair to mutate
			// Simply assign the rule the value
			if (!key) {
				return {
					...state,
					[stackingType]: {
						...state[stackingType],
						[setting]: value,
					},
				};
			}

			// If the rule doesn't originally exist,
			// Add it and the current key/value
			if (!state[setting]) {
				return {
					...state,
					[stackingType]: {
						...state[stackingType],
						[setting]: [
							{
								key,
								value,
							},
						],
					},
				};
			}

			// If the user has modified the value of an already existing team,
			// Find it
			const existingSetting = state[stackingType][setting]?.findIndex(
				(_setting) => _setting.key === key
			);

			// If existingRule doesn't exist,
			// Add it and the current key/value
			if (existingSetting === -1) {
				return {
					...state,
					[stackingType]: {
						...state[stackingType],
						[setting]: [
							...state[setting],
							{
								key,
								value,
							},
						],
					},
				};
			}

			// Create new array due to unmutable state
			const PREV_STATE = [...state[stackingType][setting]];

			// Replace position of existingRule with new value
			PREV_STATE[existingSetting] = {
				...PREV_STATE[existingSetting],
				value,
			};

			return {
				...state,
				[stackingType]: {
					...state[stackingType],
					[setting]: PREV_STATE,
				},
			};
		}

		case REMOVE_FROM_SETTING: {
			const settings = state[stackingType]?.[setting].filter(
				(_setting) => _setting !== key
			);

			if (settings.length === 0) {
				const mutState = { ...state };

				delete mutState[stackingType][setting];

				// If POSITION or TEAM objects are empty,
				// delete those keys
				if (Object.keys(mutState[stackingType]).length === 0) {
					delete mutState[stackingType];
				}

				return mutState;
			}

			return {
				...state,
				[stackingType]: {
					...state[stackingType],
					[setting]: settings,
				},
			};
		}

		case SET_STACKING_ACTIVE_TAB:
			return {
				...state,
				activeTab,
			};

		case RESET_SETTINGS:
			return {
				...DEFAULT_STATE,
				activeTab: state.activeTab,
			};

		default:
			return state;
	}
};

export default StackingReducer;
