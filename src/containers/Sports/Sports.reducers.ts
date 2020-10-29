import { ISports } from '../../interfaces/ISports';
import { SET_SPORTS, UPDATE_SPORT } from './Sports.actions';

export interface ISportsState {
	sports: ISports[];
	sport: string;
}

const DEFAULT_STATE = {
	sports: [],
	sport: null,
};

const SportsReducer = (state = DEFAULT_STATE, { type, sports, sport }) => {
	switch (type) {
		case UPDATE_SPORT:
			return {
				...state,
				sport,
			};

		case SET_SPORTS:
			return {
				...state,
				sports,
			};

		default:
			return state;
	}
};

export default SportsReducer;
