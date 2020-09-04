export const LOCK_PLAYERS = 'LOCK_PLAYERS';

export const lockPlayer = (e: React.ChangeEvent<HTMLInputElement>) => ({
	type: LOCK_PLAYERS,
	payload: e.currentTarget,
});
