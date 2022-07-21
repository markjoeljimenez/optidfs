import { IDraftKingsContest, IYahooContest } from '@/containers/Contests';

export interface IContestsBody {
	provider: string;
	sport: string;
	sportId: number;
}

export type IContestsResponse = IDraftKingsContest[] | IYahooContest[];

export interface IPlayersBody {
	id: number;
	provider: string;
	gameType?: string;
}
