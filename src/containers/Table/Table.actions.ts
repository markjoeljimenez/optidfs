export const GET_PLAYERS_SUCCEEDED = 'GET_PLAYERS_SUCCEEDED';
export const GET_PLAYERS_FAILED = 'GET_PLAYERS_FAILED';
export const RESET_PLAYERS = 'RESET_PLAYERS';
export const LOADING_PLAYERS = 'LOADING_PLAYERS';
export const SELECT_PLAYER = 'SELECT_PLAYER';
export const NEXT = 'NEXT';
export const PREVIOUS = 'PREVIOUS';

export const resetPlayers = () => ({
	type: RESET_PLAYERS,
});

export const nextPage = () => ({
	type: NEXT,
});

export const previousPage = () => ({
	type: PREVIOUS,
});
