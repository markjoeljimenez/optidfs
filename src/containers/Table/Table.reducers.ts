import {
	GET_PLAYERS_SUCCEEDED,
	GET_PLAYERS_FAILED,
	RESET_PLAYERS,
	LOADING_PLAYERS,
} from './Table.actions';

const table = (state = {}, { type, payload, loading }) => {
	switch (type) {
		case LOADING_PLAYERS:
			return {
				...state,
				loading,
			};
		case GET_PLAYERS_SUCCEEDED:
			return {
				...state,
				players: payload,
				loading,
			};
		case GET_PLAYERS_FAILED:
			console.log(GET_PLAYERS_FAILED);
			return state;
		case RESET_PLAYERS:
			return {
				...state,
				players: [],
			};
		default:
			return state;
	}
};

export default table;
