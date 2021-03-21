import Fuse from 'fuse.js';
import uniq from 'lodash.uniqby';
import { AnyAction } from 'redux';

import {
	OPTIMIZE_PLAYERS_FAILED,
	OPTIMIZE_PLAYERS_SUCCEEDED,
} from '../Optimize/Optimize.actions';
import { IDraftKingsPlayer } from '../../interfaces/IDraftKingsResponse';
import { SEARCH_PLAYERS } from '../Search/Search.actions';
import { RESET_PLAYERS } from '../Dropdown/Dropdown.actions';
import { TABLE_ACTIONS } from './Table.actions';

type ITableState = {
	page: number;
	view: 'all' | 'optimized';
	loading: boolean;
	// draftGroupId?: string;
	// gameType?: string;
	// lineups?: ILineup[];
	// payload?: any;
	// playerId?: string;
	// players?: IPlayers;
	// searchTerm?: string;
	// teams?: string[];
	// totalFppg?: number;
	// totalSalary?: number;
	// value?: string;
};

const DEFAULT_STATE: ITableState = {
	page: 0,
	view: 'all',
	loading: false,
};

const TableReducer = (
	state = DEFAULT_STATE,
	{ type, loading }: AnyAction
): ITableState => {
	switch (type) {
		case TABLE_ACTIONS.LOADING_TABLE:
			return {
				...state,
				loading,
			};

		// case PREVIOUS: {
		// 	const index = state.page - 1 <= 0 ? 0 : state.page - 1;

		// 	if (!state.lineups) {
		// 		return state;
		// 	}

		// 	const lineup = state.lineups[index];

		// 	return {
		// 		...state,
		// 		page: index,
		// 		optimizedPlayers: lineup.players,
		// 		players: lineup.players,
		// 		totalFppg: lineup.totalFppg,
		// 		totalSalary: lineup.totalSalary,
		// 	};
		// }

		// case NEXT: {
		// 	const index =
		// 		state.lineups && state.page + 1 >= state.lineups?.length
		// 			? state.page
		// 			: state.page + 1;

		// 	if (!state.lineups) {
		// 		return state;
		// 	}

		// 	const lineup = state.lineups[index];

		// 	return {
		// 		...state,
		// 		page: index,
		// 		optimizedPlayers: lineup.players,
		// 		players: lineup.players,
		// 		totalFppg: lineup.totalFppg,
		// 		totalSalary: lineup.totalSalary,
		// 	};
		// }

		// case SEARCH_PLAYERS: {
		// 	if (!searchTerm) {
		// 		return {
		// 			...state,
		// 			players: state.optimizedPlayers?.length
		// 				? state.optimizedPlayers
		// 				: state.defaultPlayers,
		// 		};
		// 	}

		// 	if (!state.players || !state.defaultPlayers) {
		// 		return state;
		// 	}

		// 	const fuse = new Fuse(
		// 		state.optimizedPlayers?.length
		// 			? state.optimizedPlayers
		// 			: state.defaultPlayers,
		// 		{
		// 			includeScore: true,
		// 			threshold: 0.2,
		// 			keys: ['first_name', 'last_name', 'team'],
		// 		}
		// 	);

		// 	const result = fuse.search(searchTerm);

		// 	return {
		// 		...state,
		// 		players: result.map((player) => player.item),
		// 	};
		// }

		// case LOCK_PLAYERS: {
		// 	const player = state.players?.locked?.find(
		// 		(_player) => _player.id === parseInt(payload.value)
		// 	);

		// 	// Remove player from excludedPlayers
		// 	const excludedPlayers = state.players?.excluded?.filter(
		// 		(_player) => _player.id !== parseInt(payload.value)
		// 	);

		// 	if (!state.players?.locked) {
		// 		return {
		// 			...state,
		// 			players: {
		// 				...state.players,
		// 				excluded: excludedPlayers?.length
		// 					? excludedPlayers
		// 					: undefined,
		// 				locked: [player],
		// 			},
		// 		};
		// 	}

		// 	return {
		// 		...state,
		// 		players: {
		// 			...state.players,
		// 			excluded: excludedPlayers?.length
		// 				? excludedPlayers
		// 				: undefined,
		// 			locked: payload.checked
		// 				? uniq([...state.players.locked, player])
		// 				: state.players.locked.filter(
		// 						(_player) =>
		// 							_player.id !== parseInt(payload.value)
		// 				  ),
		// 		},
		// 	};
		// }

		// case EXCLUDE_PLAYERS: {
		// 	const player = state.players?.excluded.find(
		// 		(_player) => _player.id === parseInt(payload.value)
		// 	);

		// 	// Remove player from lockedPlayers
		// 	const lockedPlayers = state.players?.locked.filter(
		// 		(_player) => _player.id !== parseInt(payload.value)
		// 	);

		// 	if (!state.players?.excluded) {
		// 		return {
		// 			...state,
		// 			players: {
		// 				...state.players,
		// 				locked: lockedPlayers?.length
		// 					? lockedPlayers
		// 					: undefined,
		// 				excluded: [player],
		// 			},
		// 		};
		// 	}

		// 	return {
		// 		...state,
		// 		players: {
		// 			...state.players,
		// 			locked: lockedPlayers?.length ? lockedPlayers : undefined,
		// 			excluded: payload.checked
		// 				? uniq([...state.players.excluded, player])
		// 				: state.players.excluded.filter(
		// 						(_player) =>
		// 							_player.id !== parseInt(payload.value)
		// 				  ),
		// 		},
		// 	};
		// }

		// case CLEAR_TOGGLE: {
		// 	// Remove player from lockedPlayers
		// 	const locked = state.players?.locked?.filter(
		// 		(_player) => _player.id !== parseInt(payload.value)
		// 	);

		// 	// Remove player from excludedPlayers
		// 	const excluded = state.players?.excluded?.filter(
		// 		(_player) => _player.id !== parseInt(payload.value)
		// 	);

		// 	return {
		// 		...state,
		// 		players: {
		// 			...state.players,
		// 			locked,
		// 			excluded,
		// 		},
		// 	};
		// }

		// case SET_PLAYER_EXPOSURE: {
		// 	if (!playerId || !state.defaultPlayers) {
		// 		return state;
		// 	}

		// 	const player = state.defaultPlayers?.find(
		// 		(_player) => _player.id === parseInt(playerId)
		// 	);

		// 	if (player) {
		// 		player.min_exposure = value ? parseFloat(value) : undefined;

		// 		return {
		// 			...state,
		// 			defaultPlayers: uniq([...state.defaultPlayers, player]),
		// 		};
		// 	}

		// 	return state;
		// }

		// case SET_PLAYER_PROJECTED_OWNERSHIP: {
		// 	if (!playerId || !state.defaultPlayers) {
		// 		return state;
		// 	}

		// 	const player = state.defaultPlayers?.find(
		// 		(_player) => _player.id === parseInt(playerId)
		// 	);

		// 	if (player) {
		// 		player.projected_ownership = value
		// 			? parseFloat(value)
		// 			: undefined;

		// 		return {
		// 			...state,
		// 			defaultPlayers: uniq([...state.defaultPlayers, player]),
		// 		};
		// 	}

		// 	return state;
		// }

		// case VIEW_ALL_PLAYERS:
		// 	return {
		// 		...state,
		// 		players: state.defaultPlayers,
		// 		view: 'all',
		// 	};

		// case VIEW_OPTIMIZED_LINEUPS:
		// 	return {
		// 		...state,
		// 		players: state.optimizedPlayers,
		// 		view: 'optimized',
		// 	};

		// case RESET_PLAYERS:
		// 	return {
		// 		...state,
		// 		contests: undefined,
		// 		defaultPlayers: undefined,
		// 		draftGroupId: undefined,
		// 		lineups: undefined,
		// 		lockedPlayers: undefined,
		// 		excludedPlayers: undefined,
		// 		optimizedPlayers: undefined,
		// 		page: 0,
		// 		players: undefined,
		// 		teams: undefined,
		// 		totalFppg: undefined,
		// 		totalSalary: undefined,
		// 	};

		default:
			return state;
	}
};

export default TableReducer;
