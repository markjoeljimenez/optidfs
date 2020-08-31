import {
	GET_PLAYERS_SUCCEEDED,
	GET_PLAYERS_FAILED,
	RESET_PLAYERS,
} from './Table.actions';

const table = (state = {}, { type, payload }) => {
	switch (type) {
		case GET_PLAYERS_SUCCEEDED:
			return {
				...state,
				players: payload,
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
