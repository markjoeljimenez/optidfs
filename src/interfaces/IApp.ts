import { IPlayer } from '@/containers/Players';

export interface IResponse {
	lineups: ILineup[];
	message: string | null;
	success: boolean;
}

export interface ILineup {
	players: IPlayer[];
	totalFppg: number;
	totalSalary: number;
}

export interface IGroup {
	id: number;
	sport_id: string;
}
