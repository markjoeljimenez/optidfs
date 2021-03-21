export const OPTIMIZE_ACTIONS = {
	OPTIMIZE_PLAYERS: 'OPTIMIZE_PLAYERS',
	OPTIMIZE_PLAYERS_SUCCEEDED: 'OPTIMIZE_PLAYERS_SUCCEEDED',
	OPTIMIZE_PLAYERS_FAILED: 'OPTIMIZE_PLAYERS_FAILED',
};

export const optimize = () => ({
	type: OPTIMIZE_ACTIONS.OPTIMIZE_PLAYERS,
});

export const optimizePlayersSucceeded = (lineups) => ({
	type: OPTIMIZE_ACTIONS.OPTIMIZE_PLAYERS_SUCCEEDED,
	lineups,
});

export const optimizePlayersFailed = () => ({
	type: OPTIMIZE_ACTIONS.OPTIMIZE_PLAYERS_FAILED,
});
