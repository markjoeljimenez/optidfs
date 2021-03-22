import Fuse from 'fuse.js';
import uniq from 'lodash.uniqby';
import { AnyAction } from 'redux';

import { IDraftKingsPlayer } from '../../interfaces/IDraftKingsResponse';
import { PLAYERS_ACTIONS } from './Players.actions';
import { OPTIMIZE_ACTIONS } from '../Optimize/Optimize.actions';

interface ILineup {
	players: IDraftKingsPlayer[];
	totalFppg: number;
	totalSalary: number;
};

interface IPlayersState {
	all?: IDraftKingsPlayer[];
	excluded?: IDraftKingsPlayer[];
	lineups?: ILineup[];
	locked?: IDraftKingsPlayer[];
	optimized?: IDraftKingsPlayer[];
	searched?: IDraftKingsPlayer[];
	positions?: string[];
	teams?: string[];
	totalFppg?: number;
	totalSalary?: number;
};

const DEFAULT_STATE: IPlayersState = {};

const PlayersReducers = (
	state = DEFAULT_STATE,
	{ type, players, lineups, page, payload, search, view }: AnyAction
): IPlayersState => {
	switch (type) {
		case PLAYERS_ACTIONS.GET_PLAYERS_SUCCEEDED: {
			const teams =
				players && uniq(players, 'team').map(({ team }) => team);
			const positions =
				players &&
				uniq(
					uniq(players, 'position')
						.map(({ position }) => position)
						.map((pos: string) => pos.split('/'))
						.flat()
				);

			return {
				...state,
				all: players,
				positions,
				teams,
			};
		}

		case PLAYERS_ACTIONS.LOCK_PLAYERS: {
			const player = state.all?.find(
				(_player) => _player.id === parseInt(payload.value)
			);

			// Remove player from excludedPlayers
			const excluded = state.excluded?.filter(
				(_player) => _player.id !== parseInt(payload.value)
			);

			if (player) {
				return {
					...state,
					excluded,
					locked: state.locked ? [...state.locked, player] : [player],
				};
			}

			return state;
		}

		case PLAYERS_ACTIONS.EXCLUDE_PLAYERS: {
			const player = state.all?.find(
				(_player) => _player.id === parseInt(payload.value)
			);

			// Remove player from lockedPlayers
			const locked = state.locked?.filter(
				(_player) => _player.id !== parseInt(payload.value)
			);

			if (player) {
				return {
					...state,
					excluded: state.excluded
						? [...state.excluded, player]
						: [player],
					locked,
				};
			}

			return state;
		}

		case PLAYERS_ACTIONS.CLEAR_TOGGLE: {
			// Remove player from lockedPlayers
			const locked = state.locked?.filter(
				(_player) => _player.id !== parseInt(payload.value)
			);

			// Remove player from excludedPlayers
			const excluded = state.excluded?.filter(
				(_player) => _player.id !== parseInt(payload.value)
			);

			return {
				...state,
				locked,
				excluded,
			};
		}

		case PLAYERS_ACTIONS.SEARCH_PLAYERS: {
			if (!search) {
				return {
					...state,
					searched: undefined
				};
			}

			if (state) {
				const fuse = new Fuse(
					state[view],
					{
						includeScore: true,
						threshold: 0.2,
						keys: ['first_name', 'last_name', 'team'],
					}
				);

				const result: Fuse.FuseResult<IDraftKingsPlayer>[] = fuse.search(search);

				return {
					...state,
					searched: result.map((player) => player.item),
				};
			}

			return state;
		}

		case OPTIMIZE_ACTIONS.OPTIMIZE_PLAYERS_SUCCEEDED: {
			const transformedLineups: ILineup[] = lineups?.map((lineup) => ({
				...lineup,
				players: lineup.players.map((player) =>
					state.all?.find(
						(_player) => _player.id === parseInt(player)
					)
				),
			}));

			const { totalSalary, totalFppg } = transformedLineups[0];

			return {
				...state,
				optimized: transformedLineups[0].players,
				lineups: transformedLineups,
				totalSalary,
				totalFppg,
			};
		}

		case PLAYERS_ACTIONS.UPDATE_LINEUPS_PAGE: {
			const lineup = state.lineups?.[page];

			return {
				...state,
				optimized: lineup?.players || state.optimized,
				totalFppg: lineup?.totalFppg || state.totalFppg,
				totalSalary: lineup?.totalSalary || state.totalSalary,
			};
		}

		default:
			return state;
	}
};

export default PlayersReducers;
