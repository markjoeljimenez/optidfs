export const TABLE_ACTIONS = {
	LOADING_TABLE: 'LOADING_TABLE',
	NEXT: 'NEXT',
	PREVIOUS: 'PREVIOUS',
	VIEW_ALL_PLAYERS: 'VIEW_ALL_PLAYERS',
	VIEW_OPTIMIZED_LINEUPS: 'VIEW_OPTIMIZED_LINEUPS',
};

export const loadingTable = (loading: boolean) => ({
	type: TABLE_ACTIONS.LOADING_TABLE,
	loading,
});

export const nextPage = () => ({
	type: TABLE_ACTIONS.NEXT,
});

export const previousPage = () => ({
	type: TABLE_ACTIONS.PREVIOUS,
});

export const viewAllPlayersAction = () => ({
	type: TABLE_ACTIONS.VIEW_ALL_PLAYERS,
});

export const viewOptimizedLineupsAction = () => ({
	type: TABLE_ACTIONS.VIEW_OPTIMIZED_LINEUPS,
});
