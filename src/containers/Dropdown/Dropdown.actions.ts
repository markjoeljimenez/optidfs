import { IDraftKingsContest } from '../../interfaces/draftkings/IDraftKingsContest';
import { IContest } from '../../interfaces/IContest';
import { IYahooContest } from '../../interfaces/yahoo/IYahooContest';

export const DROPDOWN_ACTIONS = {
	LOADING_CONTESTS: 'LOADING_CONTESTS',
	FETCH_CONTESTS: 'FETCH_CONTESTS',
	SET_CONTESTS: 'SET_CONTESTS',
	SET_GAMETYPE: 'SET_GAMETYPE',
	SET_CONTEST: 'SET_CONTEST',
};

export const setContests = (
	contests: (IDraftKingsContest | IYahooContest)[],
	provider: string
) => ({
	type: DROPDOWN_ACTIONS.SET_CONTESTS,
	contests,
	provider,
});

export const setGameType = (gameType: string) => ({
	type: DROPDOWN_ACTIONS.SET_GAMETYPE,
	gameType,
});

export const setContest = (contest: IContest) => ({
	type: DROPDOWN_ACTIONS.SET_CONTEST,
	contest,
});
