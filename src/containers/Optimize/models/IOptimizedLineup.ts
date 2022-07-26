import { IPlayer } from '@/containers/Players';

export default interface IOptimizedLineup {
	fppg: number;
	players: IPlayer[];
	salary: number;
}
