import { TPlayerStatus } from '@/containers/Players/models/IPlayerStatus';

export default interface IOptimizeSettings {
	numberOfLineups: number;
	statusFilters: TPlayerStatus[];
}
