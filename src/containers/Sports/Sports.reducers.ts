import { HYDRATE } from 'next-redux-wrapper';
import { ISport } from '../../interfaces/ISports';
import {
	RESET_SELECTED_SPORT,
	SET_SPORTS,
	UPDATE_SPORT,
} from './Sports.actions';

interface ISportsState {
	allSports: ISport[];
	selectedSport?: ISport;
}

interface SportsAction extends ISportsState {
	type: string;
	payload: any;
}

const DEFAULT_STATE: ISportsState = {
	allSports: [],
};

const SportsReducer = (
	state = DEFAULT_STATE,
	{ type, allSports, selectedSport, payload }: SportsAction
) => {
	switch (type) {
		case HYDRATE:
			return {
				...state,
				allSports: payload.sports.allSports as ISport[],
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

		case RESET_SELECTED_SPORT:
			return DEFAULT_STATE;

		default:
			return state;
	}
};

export default SportsReducer;
