import Fuse from 'fuse.js';
import uniq from 'lodash.uniqby';

import {
	GET_PLAYERS_SUCCEEDED,
	GET_PLAYERS_FAILED,
	LOADING_PLAYERS,
	NEXT,
	PREVIOUS,
	SET_PLAYER_EXPOSURE,
	LOCK_PLAYERS,
	SET_PLAYER_PROJECTED_OWNERSHIP,
} from './Table.actions';
import { OPTIMIZE_PLAYERS_SUCCEEDED } from '../Optimize/Optimize.actions';
import { IDraftKingsPlayer } from '../../interfaces/IDraftKingsResponse';
import { SEARCH_PLAYERS } from '../Search/Search.actions';
import { RESET_PLAYERS } from '../Dropdown/Dropdown.actions';

export interface IActions {
	type?: string;
	defaultPlayers?: IDraftKingsPlayer[];
	optimizedPlayers?: IDraftKingsPlayer[];
	lockedPlayers?: IDraftKingsPlayer[];
	players?: IDraftKingsPlayer[];
	loading?: boolean;
	draftGroupId?: string;
	lineups?: {
		players: string[];
		totalFppg: number;
		totalSalary: number;
	}[];
	page: number;
	totalFppg?: number;
	totalSalary?: number;
	searchTerm?: string;
	payload?: any;
	playerId?: string;
	value?: string;
	team?: string;
	teamIds?: {
		away_team_id: number;
		home_team_id: number;
	};
}

const table = (
	state: IActions = {
		page: 0,
	},
	{
		type,
		team,
		players,
		loading,
		draftGroupId,
		lineups,
		searchTerm,
		payload,
		playerId,
		value,
		teamIds,
	}: IActions
) => {
	switch (type) {
		case LOADING_PLAYERS:
			return {
				...state,
				loading,
			};

		case GET_PLAYERS_SUCCEEDED:
			return {
				...state,
				defaultPlayers: players,
				players,
				draftGroupId,
				loading,
				teamIds,
			};

		case GET_PLAYERS_FAILED:
			return state;

		case OPTIMIZE_PLAYERS_SUCCEEDED: {
			const transformedLineups = lineups?.map((lineup) => ({
				...lineup,
				players: lineup.players.map((player) =>
					state.defaultPlayers?.find(
						(_player) => _player.id === parseInt(player)
					)
				),
			}));

			const lineup = transformedLineups?.[0];

			return {
				...state,
				page: 0,
				defaultLineups: lineups,
				optimizedPlayers: lineup?.players,
				players: lineup?.players,
				totalFppg: lineup?.totalFppg,
				totalSalary: lineup?.totalSalary,
				lineups: transformedLineups,
				loading,
			};
		}

		case PREVIOUS: {
			const index = state.page - 1 <= 0 ? 0 : state.page - 1;

			if (!state.lineups) {
				return state;
			}

			const lineup = state.lineups[index];

			return {
				...state,
				page: index,
				optimizedPlayers: lineup.players,
				players: lineup.players,
				totalFppg: lineup.totalFppg,
				totalSalary: lineup.totalSalary,
			};
		}

		case NEXT: {
			const index =
				state.lineups && state.page + 1 >= state.lineups?.length
					? state.page
					: state.page + 1;

			if (!state.lineups) {
				return state;
			}

			const lineup = state.lineups[index];

			return {
				...state,
				page: index,
				optimizedPlayers: lineup.players,
				players: lineup.players,
				totalFppg: lineup.totalFppg,
				totalSalary: lineup.totalSalary,
			};
		}

		case SEARCH_PLAYERS: {
			if (!searchTerm) {
				return {
					...state,
					players: state.optimizedPlayers?.length
						? state.optimizedPlayers
						: state.defaultPlayers,
				};
			}

			if (!state.players || !state.defaultPlayers) {
				return state;
			}

			const fuse = new Fuse(
				state.optimizedPlayers?.length
					? state.optimizedPlayers
					: state.defaultPlayers,
				{
					includeScore: true,
					threshold: 0.2,
					keys: ['first_name', 'last_name', 'team'],
				}
			);

			const result = fuse.search(searchTerm);

			return {
				...state,
				players: result.map((player) => player.item),
			};
		}

		case LOCK_PLAYERS: {
			const player = state.players?.find(
				(_player) => _player.id === parseInt(payload.value)
			);

			if (!state.lockedPlayers) {
				return {
					...state,
					lockedPlayers: [player],
				};
			}

			return {
				...state,
				lockedPlayers: payload.checked
					? uniq([...state.lockedPlayers, player])
					: state.lockedPlayers.filter(
							(_player) => _player.id !== parseInt(payload.value)
					  ),
			};
		}

		case SET_PLAYER_EXPOSURE: {
			if (!playerId || !state.defaultPlayers) {
				return state;
			}

			const player = state.defaultPlayers?.find(
				(_player) => _player.id === parseInt(playerId)
			);

			if (player) {
				player.min_exposure = value ? parseFloat(value) : undefined;

				return {
					...state,
					defaultPlayers: uniq([...state.defaultPlayers, player]),
				};
			}

			return state;
		}

		case SET_PLAYER_PROJECTED_OWNERSHIP: {
			if (!playerId || !state.defaultPlayers) {
				return state;
			}

			const player = state.defaultPlayers?.find(
				(_player) => _player.id === parseInt(playerId)
			);

			if (player) {
				player.projected_ownership = value
					? parseFloat(value)
					: undefined;

				return {
					...state,
					defaultPlayers: uniq([...state.defaultPlayers, player]),
				};
			}

			return state;
		}

		case RESET_PLAYERS:
			return {
				...state,
				contests: undefined,
				defaultPlayers: undefined,
				draftGroupId: undefined,
				lineups: undefined,
				lockedPlayers: undefined,
				optimizedPlayers: undefined,
				page: 0,
				players: undefined,
				teamIds: undefined,
				totalFppg: undefined,
				totalSalary: undefined,
			};

		default:
			return state;
	}
};

export default table;
