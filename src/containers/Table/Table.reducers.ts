import { AnyAction } from 'redux';

import { TABLE_ACTIONS } from './Table.actions';

export type View = 'all' | 'optimized';

type ITableState = {
	page: number;
	view: View;
	loading: boolean;
};

const DEFAULT_STATE: ITableState = {
	page: 0,
	view: 'all',
	loading: false,
};

const TableReducer = (
	state = DEFAULT_STATE,
	{ type, loading, view, page }: AnyAction
): ITableState => {
	switch (type) {
		case TABLE_ACTIONS.LOADING_TABLE:
			return {
				...state,
				loading,
			};

		case TABLE_ACTIONS.SET_VIEW:
			return {
				...state,
				view,
			};

		case TABLE_ACTIONS.SET_PAGE:
			return {
				...state,
				page,
			};

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
