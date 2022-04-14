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
		id: contest.draft_group_id,
		name: contest.name,
		gameType: contest.game_type,
	}));

export const mapYahooContests = (
	draftKingsContests: IYahooContest[]
): IContest[] =>
	draftKingsContests.map((contest) => ({
		id: contest.id,
		name: contest.title,
	}));
