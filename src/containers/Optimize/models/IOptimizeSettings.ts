import { IPlayer } from '@/containers/Players';
import { TPlayerStatus } from '@/containers/Players/models/IPlayerStatus';

export default interface IOptimizeSettings {
	lockedPlayers: IPlayer['id'][];
	numberOfLineups: number;
	statusFilters: TPlayerStatus[];
}
