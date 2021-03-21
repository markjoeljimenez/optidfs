import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';
import { ISports } from '../../interfaces/ISports';
import { SET_SPORTS, UPDATE_SPORT } from './Sports.actions';

interface ISportsState {
	allSports: ISports[];
	selectedSport?: string;
}

const DEFAULT_STATE: ISportsState = {
	allSports: [],
};

const SportsReducer = (
	state = DEFAULT_STATE,
	{ type, allSports, selectedSport, payload }: AnyAction
) => {
	switch (type) {
		case HYDRATE:
			return {
				...state,
				allSports: payload.sports.allSports,
			};

		case UPDATE_SPORT:
			return {
				...state,
				selectedSport,
			};

		case SET_SPORTS:
			return {
				...state,
				allSports,
			};

		default:
			return state;
	}
};

export default SportsReducer;
