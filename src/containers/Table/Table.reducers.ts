const table = (state = {}, { type, payload }) => {
	switch (type) {
		case 'GET_PLAYERS_SUCCEEDED':
			return {
				...state,
				players: payload,
			};
		default:
			return state;
	}
};

export default table;
