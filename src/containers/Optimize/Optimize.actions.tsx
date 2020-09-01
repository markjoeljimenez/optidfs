export const OPTIMIZE_PLAYERS = 'OPTIMIZE_PLAYERS';
export const OPTIMIZE_PLAYERS_SUCCEEDED = 'OPTIMIZE_PLAYERS_SUCCEEDED';
export const OPTIMIZE_PLAYERS_FAILED = 'OPTIMIZE_PLAYERS_FAILED';

export const optimize = (draftGroupId) => ({
	type: OPTIMIZE_PLAYERS,
	draftGroupId,
});
