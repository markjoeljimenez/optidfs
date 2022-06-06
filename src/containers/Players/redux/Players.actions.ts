import { View } from '../../Table/Table.reducers';
import { IDraftKingsPlayer } from '../interfaces/IDraftKingsPlayer';
import { IYahooPlayer } from '../interfaces/IYahooPlayer';

export const PLAYERS_ACTIONS = {
	CLEAR_TOGGLE: 'CLEAR_TOGGLE',
	EXCLUDE_PLAYERS: 'EXCLUDE_PLAYERS',
	FETCH_PLAYERS: 'FETCH_PLAYERS',
	GET_PLAYERS_SUCCEEDED: 'GET_PLAYERS_SUCCEEDED',
	LOCK_PLAYERS: 'LOCK_PLAYERS',
	SET_PLAYER_EXPOSURE: 'SET_PLAYER_EXPOSURE',
	SET_PLAYER_PROJECTED_OWNERSHIP: 'SET_PLAYER_PROJECTED_OWNERSHIP',
	RESET_PLAYERS: 'RESET_PLAYERS',
	UPDATE_LINEUPS_PAGE: 'UPDATE_LINEUPS_PAGE',
	SEARCH_PLAYERS: 'SEARCH_PLAYERS',
	FILTER_PLAYERS: 'FILTER_PLAYERS',
};

export const getPlayers = (value: number | File) => ({
	type: PLAYERS_ACTIONS.FETCH_PLAYERS,
	value,
});

export const getPlayersSucceeded = (
	players: (IDraftKingsPlayer | IYahooPlayer)[],
	provider: string
) => ({
	type: PLAYERS_ACTIONS.GET_PLAYERS_SUCCEEDED,
	players,
	provider,
});

export const setPlayerExposure = (id: string, value: number) => ({
	type: PLAYERS_ACTIONS.SET_PLAYER_EXPOSURE,
	id,
	value,
});

export const setProjectedOwnership = (id: string, value: number) => ({
	type: PLAYERS_ACTIONS.SET_PLAYER_PROJECTED_OWNERSHIP,
	id,
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

export const clearToggle = (e: React.MouseEvent<HTMLInputElement>) => ({
	type: PLAYERS_ACTIONS.CLEAR_TOGGLE,
	payload: e.currentTarget,
});

export const searchPlayers = (search: number | string, view: View) => ({
	type: PLAYERS_ACTIONS.SEARCH_PLAYERS,
	search,
	view,
});

export const updateLineupsPage = (page: number) => ({
	type: PLAYERS_ACTIONS.UPDATE_LINEUPS_PAGE,
	page,
});

export const filterPlayers = (filter: 'all' | string[]) => ({
	type: PLAYERS_ACTIONS.FILTER_PLAYERS,
	filter,
});

export const resetPlayers = () => ({
	type: PLAYERS_ACTIONS.RESET_PLAYERS,
});
