import { IDraftKingsPlayer } from './IDraftKingsResponse';

export interface IResponse {
    lineups: ILineup[];
    success: boolean;
    message: string | null;
}

export interface ILineup {
    players: IDraftKingsPlayer[];
    totalSalary: number;
    totalFppg: number;
}

export interface IContest {
    draft_group_id: number;
    name: string;
}

export interface IGroup {
    id: number;
    sport_id: string;
}
