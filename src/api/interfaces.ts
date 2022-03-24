import { IDraftKingsContest, IYahooContest } from '@/containers/Contests';

export interface IContestsBody {
	sportId: number;
	sport: string;
	provider: string;
}

export interface IContestsResponse {
	contests: (IDraftKingsContest | IYahooContest)[];
	provider: string;
}

export interface IPlayersBody {
	provider: string;
	id: number;
	gameType?: string;
}
