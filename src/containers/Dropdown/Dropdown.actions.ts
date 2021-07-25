import { IContest } from '../../interfaces/IApp';

export const DROPDOWN_ACTIONS = {
	LOADING_CONTESTS: 'LOADING_CONTESTS',
	FETCH_CONTESTS: 'FETCH_CONTESTS',
	SET_CONTESTS: 'SET_CONTESTS',
	SET_GAMETYPE: 'SET_GAMETYPE',
	SET_CONTEST: 'SET_CONTEST',
};

export const setContests = (contests: IContest[]) => ({
	type: DROPDOWN_ACTIONS.SET_CONTESTS,
	contests,
});

export const setGameType = (gameType: string) => ({
	type: DROPDOWN_ACTIONS.SET_GAMETYPE,
	gameType,
});

export const setContest = (contest: IContest) => ({
	type: DROPDOWN_ACTIONS.SET_CONTEST,
	contest,
});
