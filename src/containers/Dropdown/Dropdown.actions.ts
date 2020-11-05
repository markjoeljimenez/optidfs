export const FETCH_PLAYERS = 'FETCH_PLAYERS';
export const RESET_PLAYERS = 'RESET_PLAYERS';
export const LOADING_CONTESTS = 'LOADING_CONTESTS';
export const FETCH_CONTESTS = 'FETCH_CONTESTS';
export const SET_CONTESTS = 'SET_CONTESTS';

export const getPlayers = (value) => ({
	type: FETCH_PLAYERS,
	value,
});

export const resetPlayers = () => ({
	type: RESET_PLAYERS,
});
