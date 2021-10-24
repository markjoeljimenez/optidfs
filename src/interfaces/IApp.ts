import { IDraftKingsPlayer } from './IDraftKingsResponse';

export interface IResponse {
	lineups: ILineup[];
	success: boolean;
	message: string | null;
}

export interface ILineup {
	players: (string | IDraftKingsPlayer)[];
	// players: string[];
	totalSalary: number;
	totalFppg: number;
}

export interface IDraftKingContest {
	draft_group_id: number;
	name: string;
	game_type: string;

	// TODO: Need to make new contest interface for Yahoo
	id: number;
	title: string;
}

export interface IGroup {
	id: number;
	sport_id: string;
}
