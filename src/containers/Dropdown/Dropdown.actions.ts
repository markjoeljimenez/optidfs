export const GET_PLAYERS = 'GET_PLAYERS';
export const SET_CONTESTS = 'SET_CONTESTS';

export const getPlayers = (draftGroupId) => ({
	type: GET_PLAYERS,
	draftGroupId,
});
