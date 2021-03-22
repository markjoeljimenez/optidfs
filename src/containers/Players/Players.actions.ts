import { IDraftKingsPlayer } from '../../interfaces/IDraftKingsResponse';

export const PLAYERS_ACTIONS = {
	CLEAR_TOGGLE: 'CLEAR_TOGGLE',
	EXCLUDE_PLAYERS: 'EXCLUDE_PLAYERS',
	FETCH_PLAYERS: 'FETCH_PLAYERS',
	GET_PLAYERS_FAILED: 'GET_PLAYERS_FAILED',
	GET_PLAYERS_SUCCEEDED: 'GET_PLAYERS_SUCCEEDED',
	LOCK_PLAYERS: 'LOCK_PLAYERS',
	SET_PLAYER_EXPOSURE: 'SET_PLAYER_EXPOSURE',
	SET_PLAYER_PROJECTED_OWNERSHIP: 'SET_PLAYER_PROJECTED_OWNERSHIP',
	RESET_PLAYERS: 'RESET_PLAYERS',
	UPDATE_LINEUPS_PAGE: 'UPDATE_LINEUPS_PAGE',
};

export const getPlayers = (value: number) => ({
	type: PLAYERS_ACTIONS.FETCH_PLAYERS,
	value,
});

export const getPlayersSucceeded = (players: IDraftKingsPlayer[]) => ({
	type: PLAYERS_ACTIONS.GET_PLAYERS_SUCCEEDED,
	players,
});

export const getPlayersFailed = () => ({
	type: PLAYERS_ACTIONS.GET_PLAYERS_FAILED,
});

export const setPlayerExposure = (playerId: string, value: number) => ({
	type: PLAYERS_ACTIONS.SET_PLAYER_EXPOSURE,
	playerId,
	value,
});

export const setProjectedOwnership = (playerId: string, value: number) => ({
	type: PLAYERS_ACTIONS.SET_PLAYER_PROJECTED_OWNERSHIP,
	playerId,
	value,
});

export const lockPlayer = (e: React.MouseEvent<HTMLInputElement>) => ({
	type: PLAYERS_ACTIONS.LOCK_PLAYERS,
	payload: e.currentTarget,
});

export const excludePlayer = (e: React.MouseEvent<HTMLInputElement>) => ({
	type: PLAYERS_ACTIONS.EXCLUDE_PLAYERS,
	payload: e.currentTarget,
});

export const clearToggle = (e: React.MouseEvent<HTMLButtonElement>) => ({
	type: PLAYERS_ACTIONS.CLEAR_TOGGLE,
	payload: e.currentTarget,
});

export const updateLineupsPage = (page: number) => ({
	type: PLAYERS_ACTIONS.UPDATE_LINEUPS_PAGE,
	page,
});

export const resetPlayers = () => ({
	type: PLAYERS_ACTIONS.RESET_PLAYERS,
});
