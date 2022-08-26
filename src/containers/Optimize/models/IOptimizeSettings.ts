import { IPlayer, TPlayerStatus } from '@/containers/Players';

export interface IOptimizeSettings {
	lockedPlayers: IPlayer['id'][];
	numberOfLineups: number;
	statusFilters: TPlayerStatus[];
}
