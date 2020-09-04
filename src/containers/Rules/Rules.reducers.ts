import { SET_RULE } from '../Bar/Bar.actions';

interface IRules {
	NUMBER_OF_PLAYERS_FROM_SAME_TEAM?: {
		team: string;
		value: number;
	}[];
	NUMBER_OF_SPECIFIC_POSITIONS?: {
		team: string;
		value: number;
	}[];
}
const RulesReducer = (state: IRules = {}, { type, team, rules, value }) => {
	switch (type) {
		case SET_RULE.NUMBER_OF_PLAYERS_FROM_SAME_TEAM: {
			if (!value || team === '') {
				return state;
			}

			if (!state.NUMBER_OF_PLAYERS_FROM_SAME_TEAM) {
				return {
					...state,
					NUMBER_OF_PLAYERS_FROM_SAME_TEAM: [
						{
							team,
							value: parseInt(value),
						},
					],
				};
			}

			const existingRule = state.NUMBER_OF_PLAYERS_FROM_SAME_TEAM?.findIndex(
				(pos) => pos.team === team
			);

			if (existingRule === -1) {
				return {
					...state,
					NUMBER_OF_PLAYERS_FROM_SAME_TEAM: [
						...state.NUMBER_OF_PLAYERS_FROM_SAME_TEAM,
						{
							team,
							value: parseInt(value),
						},
					],
				};
			}

			const PREV_NUMBER_OF_PLAYERS_FROM_SAME_TEAM = [
				...state.NUMBER_OF_PLAYERS_FROM_SAME_TEAM,
			];

			PREV_NUMBER_OF_PLAYERS_FROM_SAME_TEAM[existingRule] = {
				...PREV_NUMBER_OF_PLAYERS_FROM_SAME_TEAM[existingRule],
				value: parseInt(value),
			};

			return {
				...state,
				NUMBER_OF_PLAYERS_FROM_SAME_TEAM: PREV_NUMBER_OF_PLAYERS_FROM_SAME_TEAM,
			};
		}

		case SET_RULE.NUMBER_OF_SPECIFIC_POSITIONS: {
			if (!value || team === '') {
				return state;
			}

			if (!state.NUMBER_OF_SPECIFIC_POSITIONS) {
				return {
					...state,
					NUMBER_OF_SPECIFIC_POSITIONS: [
						{
							team,
							value: parseInt(value),
						},
					],
				};
			}

			const existingRule = state.NUMBER_OF_SPECIFIC_POSITIONS?.findIndex(
				(pos) => pos.team === team
			);

			if (existingRule === -1) {
				return {
					...state,
					NUMBER_OF_SPECIFIC_POSITIONS: [
						...state.NUMBER_OF_SPECIFIC_POSITIONS,
						{
							team,
							value: parseInt(value),
						},
					],
				};
			}

			const PREV_NUMBER_OF_SPECIFIC_POSITIONS = [
				...state.NUMBER_OF_SPECIFIC_POSITIONS,
			];

			PREV_NUMBER_OF_SPECIFIC_POSITIONS[existingRule] = {
				...PREV_NUMBER_OF_SPECIFIC_POSITIONS[existingRule],
				value: parseInt(value),
			};

			return {
				...state,
				NUMBER_OF_SPECIFIC_POSITIONS: PREV_NUMBER_OF_SPECIFIC_POSITIONS,
			};
		}

		default:
			return state;
	}
};

export default RulesReducer;
