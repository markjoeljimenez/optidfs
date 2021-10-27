import uniq from 'lodash.uniqby';

import { PLAYERS_ACTIONS } from './Players.actions';
import { OPTIMIZE_ACTIONS } from '../Optimize/Optimize.actions';
import { IYahooPlayer } from '../../interfaces/yahoo/IYahooPlayer';
import {
	mapDraftKingsPlayersToPlayers,
	mapYahooPlayersToPlayers,
} from '../../scripts/services/mapPlayers';
import { IDraftKingsPlayer } from '../../interfaces/draftkings/IDraftKingsPlayer';
import { IPlayer } from '../../interfaces/IPlayer';
import { ILineup } from '../../interfaces/IApp';

interface IPlayersState {
	all?: IPlayer[];
	excluded?: IPlayer[];
	lineups?: ILineup[];
	locked?: IPlayer[];
	optimized?: IPlayer[];
	positions?: string[];
	teams?: string[];
	totalFppg?: number;
	totalSalary?: number;
}

interface PlayersAction extends IPlayersState {
	id: string;
	page: number;
	payload: any;
	players: (IDraftKingsPlayer | IYahooPlayer)[];
	provider: string;
	search: string;
	type: string;
	value?: number;
	view: string;
}

const DEFAULT_STATE: IPlayersState = {};

const PlayersReducers = (
	state = DEFAULT_STATE,
	{
		id,
		lineups,
		page,
		payload,
		players,
		provider,
		search,
		type,
		value,
		view,
	}: PlayersAction
): IPlayersState => {
	switch (type) {
		case PLAYERS_ACTIONS.GET_PLAYERS_SUCCEEDED: {
			const transformedPlayers =
				provider === 'draftkings'
					? mapDraftKingsPlayersToPlayers(
							players as IDraftKingsPlayer[]
					  )
					: mapYahooPlayersToPlayers(players as IYahooPlayer[]);

			const teams =
				transformedPlayers &&
				uniq(transformedPlayers, 'team').map(({ team }) => team);
			const positions =
				transformedPlayers &&
				uniq(
					uniq(transformedPlayers, 'position')
						.map(({ position }) => position)
						.map((pos) =>
							pos.includes('/') ? pos.split('/') : pos
						)
						.flat()
				);

			return {
				...state,
				all: transformedPlayers,
				positions,
				teams,
			};
		}

		case PLAYERS_ACTIONS.SET_PLAYER_EXPOSURE: {
			if (!id || !state?.all) {
				return state;
			}

			const player = state.all?.find(
				(_player) => _player.id === parseInt(id)
			);

			if (player) {
				player.minExposure = value || undefined;

				return {
					...state,
					all: uniq([...state.all, player]),
				};
			}

			return state;
		}

		case PLAYERS_ACTIONS.SET_PLAYER_PROJECTED_OWNERSHIP: {
			if (!id || !state.all) {
				return state;
			}

			const player = state.all?.find(
				(_player) => _player.id === parseInt(id)
			);

			if (player) {
				player.projectedOwnership = value || undefined;

				return {
					...state,
					all: uniq([...state.all, player]),
				};
			}

			return state;
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

		// case PLAYERS_ACTIONS.SEARCH_PLAYERS: {
		// 	if (!search) {
		// 		return {
		// 			...state,
		// 			searched: undefined
		// 		};
		// 	}

		// 	if (state) {
		// 		const fuse = new Fuse(
		// 			state[view],
		// 			{
		// 				includeScore: true,
		// 				threshold: 0.2,
		// 				keys: ['first_name', 'last_name', 'team'],
		// 			}
		// 		);

		// 		const result: Fuse.FuseResult<IDraftKingsPlayer>[] = fuse.search(search);

		// 		return {
		// 			...state,
		// 			searched: result.map((player) => player.item),
		// 		};
		// 	}

		// 	return state;
		// }

		case PLAYERS_ACTIONS.RESET_PLAYERS:
			return {
				...state,
				// contests: undefined,
				all: undefined,
				// draftGroupId: undefined,
				lineups: undefined,
				locked: undefined,
				excluded: undefined,
				optimized: undefined,
				// page: 0,
				// players: undefined,
				teams: undefined,
				totalFppg: undefined,
				totalSalary: undefined,
			};

		case PLAYERS_ACTIONS.UPDATE_LINEUPS_PAGE: {
			const lineup = state.lineups?.[page];

			return {
				...state,
				optimized: lineup?.players || state.optimized,
				totalFppg: lineup?.totalFppg || state.totalFppg,
				totalSalary: lineup?.totalSalary || state.totalSalary,
			};
		}

		case OPTIMIZE_ACTIONS.OPTIMIZE_PLAYERS_SUCCEEDED: {
			const transformedLineups: ILineup[] = lineups?.map((lineup) => ({
				...lineup,
				players: lineup.players.map(
					(player) =>
						state.all?.find(
							(_player) =>
								_player.id === (player as unknown as number) // The backend gives us an array of strings
						)!
				),
			}))!;

			const { totalSalary, totalFppg } = transformedLineups[0];

			return {
				...state,
				optimized: transformedLineups[0].players,
				lineups: transformedLineups,
				totalSalary,
				totalFppg,
			};
		}

		default:
			return state;
	}
};

export default PlayersReducers;
