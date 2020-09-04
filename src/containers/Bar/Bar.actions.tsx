export const LOCK_PLAYERS = 'LOCK_PLAYERS';
export const SET_RULE = {
	NUMBER_OF_PLAYERS_FROM_SAME_TEAM: 'NUMBER_OF_PLAYERS_FROM_SAME_TEAM',
};

export const lockPlayer = (e: React.ChangeEvent<HTMLInputElement>) => ({
	type: LOCK_PLAYERS,
	payload: e.currentTarget,
});

export const setRule = (type: string, team: string, value: number) => ({
	type,
	team,
	value,
});
