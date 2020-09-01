import {
	GET_PLAYERS_SUCCEEDED,
	GET_PLAYERS_FAILED,
	RESET_PLAYERS,
	LOADING_PLAYERS,
} from './Table.actions';
import { OPTIMIZE_PLAYERS_SUCCEEDED } from '../Optimize/Optimize.actions';
import { IDraftKingsPlayer } from '../../interfaces/IDraftKingsResponse';

interface IActions {
	type?: string;
	players?: IDraftKingsPlayer[];
	loading?: boolean;
	draftGroupId?: string;
	lineups?: {
		players: string[];
		totalFppg: number;
		totalSalary: number;
	}[];
}

const table = (
	state: IActions = {},
	{ type, players, loading, draftGroupId, lineups }: IActions
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
				players,
				draftGroupId,
				loading,
			};

		case GET_PLAYERS_FAILED:
			return state;

		case OPTIMIZE_PLAYERS_SUCCEEDED: {
			const transformedLineups = lineups?.map((lineup) => ({
				...lineup,
				players: lineup.players.map((player) =>
					state.players?.find((_player) => _player.id === player)
				),
			}));

			return {
				...state,
				lineups: transformedLineups,
				loading,
			};
		}

		case RESET_PLAYERS:
			return {
				...state,
				players: [],
			};

		default:
			return state;
	}
};

export default table;
