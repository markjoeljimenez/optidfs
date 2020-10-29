export const GET_PLAYERS = 'GET_PLAYERS';
export const RESET_PLAYERS = 'RESET_PLAYERS';
export const SET_CONTESTS = 'SET_CONTESTS';

export const getPlayers = (value) => ({
	type: GET_PLAYERS,
	value,
});

export const resetPlayers = () => ({
	type: RESET_PLAYERS,
});
