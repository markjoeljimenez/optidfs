import { Status } from 'src/interfaces/IStatus';

export default interface IOptimizeSettings {
	numberOfLineups: number;
	statusFilters: (keyof typeof Status)[];
}
