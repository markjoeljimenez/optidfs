import { IPlayer } from '@/containers/Players';

export interface IOptimizedLineup {
	fppg: number;
	players: IPlayer[];
	salary: number;
}
