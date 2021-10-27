import { IDraftKingsContest } from '../../interfaces/draftkings/IDraftKingsContest';
import { IContest } from '../../interfaces/IContest';
import { IYahooContest } from '../../interfaces/yahoo/IYahooContest';

export const mapDraftKingsContestsToContests = (
	draftKingsContests: IDraftKingsContest[]
): IContest[] =>
	draftKingsContests.map((contest) => ({
		id: contest.draft_group_id,
		name: contest.name,
		gameType: contest.game_type,
	}));

export const mapYahooContestsToContests = (
	draftKingsContests: IYahooContest[]
): IContest[] =>
	draftKingsContests.map((contest) => ({
		id: contest.id,
		name: contest.title,
	}));
