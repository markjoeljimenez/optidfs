import { IDraftKingsPlayer } from '../../interfaces/IDraftKingsResponse';

export function transformPlayers(players: IDraftKingsPlayer[]) {
	return players.map((player) => ({
		...player,
		isExcluded: false,
		isLocked: false,
	}));
}
