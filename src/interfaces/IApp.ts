import { IPlayer } from './IPlayer';

export interface IResponse {
	lineups: ILineup[];
	success: boolean;
	message: string | null;
}

export interface ILineup {
	players: IPlayer[];
	totalSalary: number;
	totalFppg: number;
}

export interface IGroup {
	id: number;
	sport_id: string;
}
