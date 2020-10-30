export const GET_PLAYERS = 'GET_PLAYERS';
export const RESET_PLAYERS = 'RESET_PLAYERS';
export const LOADING_CONTESTS = 'LOADING_CONTESTS';
export const FETCH_CONTESTS = 'FETCH_CONTESTS';
export const SET_CONTESTS = 'SET_CONTESTS';

export const getPlayers = (value) => ({
	type: GET_PLAYERS,
	value,
});

export const resetPlayers = () => ({
	type: RESET_PLAYERS,
});
