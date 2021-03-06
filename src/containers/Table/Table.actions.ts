export const GET_PLAYERS_SUCCEEDED = 'GET_PLAYERS_SUCCEEDED';
export const GET_PLAYERS_FAILED = 'GET_PLAYERS_FAILED';
export const LOADING_PLAYERS = 'LOADING_PLAYERS';
export const SELECT_PLAYER = 'SELECT_PLAYER';
export const LOCK_PLAYERS = 'LOCK_PLAYERS';
export const EXCLUDE_PLAYERS = 'EXCLUDE_PLAYERS';
export const CLEAR_TOGGLE = 'CLEAR_TOGGLE';
export const NEXT = 'NEXT';
export const PREVIOUS = 'PREVIOUS';
export const SET_PLAYER_EXPOSURE = 'SET_PLAYER_EXPOSURE';
export const SET_PLAYER_PROJECTED_OWNERSHIP = 'SET_PLAYER_PROJECTED_OWNERSHIP';
export const VIEW_ALL_PLAYERS = 'VIEW_ALL_PLAYERS';
export const VIEW_OPTIMIZED_LINEUPS = 'VIEW_OPTIMIZED_LINEUPS';

export const setPlayerExposure = (playerId, value) => ({
	type: SET_PLAYER_EXPOSURE,
	playerId,
	value,
});

export const setPlayerProjectedOwnership = (playerId, value) => ({
	type: SET_PLAYER_PROJECTED_OWNERSHIP,
	playerId,
	value,
});

export const lockPlayer = (e: React.ChangeEvent<HTMLInputElement>) => ({
	type: LOCK_PLAYERS,
	payload: e.currentTarget,
});

export const excludePlayer = (e: React.ChangeEvent<HTMLInputElement>) => ({
	type: EXCLUDE_PLAYERS,
	payload: e.currentTarget,
});

export const clearToggle = (e: React.ChangeEvent<HTMLInputElement>) => ({
	type: CLEAR_TOGGLE,
	payload: e.currentTarget,
});

export const nextPage = () => ({
	type: NEXT,
});

export const previousPage = () => ({
	type: PREVIOUS,
});

export const viewAllPlayersAction = () => ({
	type: VIEW_ALL_PLAYERS,
});

export const viewOptimizedLineupsAction = () => ({
	type: VIEW_OPTIMIZED_LINEUPS,
});
