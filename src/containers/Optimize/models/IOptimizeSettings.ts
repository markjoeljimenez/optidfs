import { IPlayer, TPlayerStatus } from '@/containers/Players';

export interface IOptimizeSettings {
	excludedPlayers: IPlayer['id'][];
	lockedPlayers: IPlayer['id'][];
	numberOfLineups: number;
	statusFilters: TPlayerStatus[];
}
