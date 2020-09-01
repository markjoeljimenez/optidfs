import {
	GET_PLAYERS_SUCCEEDED,
	GET_PLAYERS_FAILED,
	RESET_PLAYERS,
	LOADING_PLAYERS,
	NEXT,
	PREVIOUS,
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
	page: number;
	totalFppg?: number;
	totalSalary?: number;
}

const table = (
	state: IActions = {
		page: 0,
	},
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

			const lineup = transformedLineups?.[0];

			return {
				...state,
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
				players: lineup.players,
				totalFppg: lineup.totalFppg,
				totalSalary: lineup.totalSalary,
			};
		}

		case RESET_PLAYERS:
			return {
				...state,
				players: undefined,
				lineups: undefined,
				page: 0,
				totalFppg: undefined,
				totalSalary: undefined,
			};

		default:
			return state;
	}
};

export default table;
