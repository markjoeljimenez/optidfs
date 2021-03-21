import { AnyAction } from 'redux';

import { IDraftKingsPlayer } from '../../interfaces/IDraftKingsResponse';
import { PLAYERS_ACTIONS } from './Players.actions';
import { OPTIMIZE_ACTIONS } from '../Optimize/Optimize.actions';

type ILineup = {
	players: string[];
	totalFppg: number;
	totalSalary: number;
};

type IPlayers = {};

type IPlayersState = {
	all?: IDraftKingsPlayer[];
	locked?: IDraftKingsPlayer[];
	optimized?: IDraftKingsPlayer[];
	excluded?: IDraftKingsPlayer[];
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

const DEFAULT_STATE: IPlayersState = {};

const PlayersReducers = (
	state = DEFAULT_STATE,
	{ type, players, lineups, gameType }: AnyAction
): IPlayersState => {
	switch (type) {
		case PLAYERS_ACTIONS.GET_PLAYERS_SUCCEEDED: {
			// const teams =
			// 	players && uniq(players, 'team').map(({ team }) => team);
			// const positions =
			// 	players &&
			// 	uniq(
			// 		uniq(players, 'position')
			// 			.map(({ position }) => position)
			// 			.map((pos: string) => pos.split('/'))
			// 			.flat()
			// 	);

			return {
				...state,
				// draftGroupId,
				// error: undefined,
				// gameType,
				all: players,
				// positions,
				// teams,
			};
		}

		case PLAYERS_ACTIONS.GET_PLAYERS_FAILED:
			return state;

		case OPTIMIZE_ACTIONS.OPTIMIZE_PLAYERS_SUCCEEDED: {
			// const transformedLineups = lineups?.map((lineup) => ({
			// 	...lineup,
			// 	players: lineup.players.map((player) =>
			// 		state.players?.all?.find(
			// 			(_player) => _player.id === parseInt(player)
			// 		)
			// 	),
			// }));

			// const lineup = transformedLineups?.[0];

			const optimized = lineups[0].players.map(
				(player) =>
					state.all?.find(
						(_player) => _player.id === parseInt(player)
					)!
			);

			return {
				...state,
				// loading: false,
				optimized: optimized || undefined,
				// gameType: '',
				// view: 'optimized',
			};
		}

		case OPTIMIZE_ACTIONS.OPTIMIZE_PLAYERS_FAILED:
			return {
				...state,
				// loading: false,
			};

		default:
			return state;
	}
};

export default PlayersReducers;
