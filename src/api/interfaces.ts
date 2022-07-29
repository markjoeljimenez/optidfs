import { IDraftKingsContest, IYahooContest } from '@/containers/Contests';
import { Providers } from '@/containers/Players';

export interface IContestsBody {
	provider: string;
	sport: string;
	sportId: number;
}

export type IContestsResponse = IDraftKingsContest[] | IYahooContest[];
