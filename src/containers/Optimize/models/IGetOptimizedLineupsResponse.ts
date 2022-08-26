import { IOptimizedLineup } from './IOptimizedLineup';

export interface IGetOptimizedLineupsResponse {
	lineups: IOptimizedLineup[];
	positions: string[];
}
