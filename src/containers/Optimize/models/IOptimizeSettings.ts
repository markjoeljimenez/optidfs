import { TStatus } from 'src/interfaces/Status';

export default interface IOptimizeSettings {
	numberOfLineups: number;
	statusFilters: TStatus[];
}
