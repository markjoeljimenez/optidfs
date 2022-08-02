import IOptimizedLineup from './IOptimizedLineup';

export default interface IGetOptimizedLineupsResponse {
	lineups: IOptimizedLineup[];
	positions: string[];
}
