import { IContest } from '../interfaces/IContest';
import { IDraftKingsContest } from '../interfaces/IDraftKingsContest';
import { IYahooContest } from '../interfaces/IYahooContest';

export const mapContests = (
	contests: IDraftKingsContest[] | IYahooContest[],
	provider: string
): IContest[] => {
	if (provider === 'draftkings') {
		return mapDraftKingsContests(contests as IDraftKingsContest[]);
	}

	return mapYahooContests(contests as IYahooContest[]);
};

export const mapDraftKingsContests = (
	draftKingsContests: IDraftKingsContest[]
): IContest[] =>
	draftKingsContests.map((contest) => ({
		contest_id: contest.draft_group_id,
		// gameType: contest.game_type,
		name: contest.name,
	}));

export const mapYahooContests = (yahooContests: IYahooContest[]): IContest[] =>
	yahooContests.map((contest) => ({
		contest_id: contest.id,
		name: contest.title,
	}));
