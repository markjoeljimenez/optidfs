import { IDraftKingsPlayer } from '../../interfaces/draftkings/IDraftKingsPlayer';

export function transformPlayers(players: IDraftKingsPlayer[]) {
	return players.map((player) => ({
		...player,
		isExcluded: false,
		isLocked: false,
	}));
}
