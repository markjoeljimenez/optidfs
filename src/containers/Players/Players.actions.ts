import { IDraftKingsPlayer } from '../../interfaces/IDraftKingsResponse';

export const PLAYERS_ACTIONS = {
	CLEAR_TOGGLE: 'CLEAR_TOGGLE',
	EXCLUDE_PLAYERS: 'EXCLUDE_PLAYERS',
	GET_PLAYERS_FAILED: 'GET_PLAYERS_FAILED',
	GET_PLAYERS_SUCCEEDED: 'GET_PLAYERS_SUCCEEDED',
	LOCK_PLAYERS: 'LOCK_PLAYERS',
	SELECT_PLAYER: 'SELECT_PLAYER',
	SET_PLAYER_EXPOSURE: 'SET_PLAYER_EXPOSURE',
	SET_PLAYER_PROJECTED_OWNERSHIP: 'SET_PLAYER_PROJECTED_OWNERSHIP',
};

export const getPlayersSucceeded = (
	players: IDraftKingsPlayer[],
	gameType: string
) => ({
	type: PLAYERS_ACTIONS.GET_PLAYERS_SUCCEEDED,
	players,
	gameType,
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
