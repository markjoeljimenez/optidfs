import { IContest } from '@/containers/Contests';
import { ISport } from '@/containers/Sports';

export interface ILocalStorage {
	contest: IContest;
	provider: string;
	sport: ISport;
}
