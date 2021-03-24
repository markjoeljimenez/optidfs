export const TABLE_ACTIONS = {
	LOADING_TABLE: 'LOADING_TABLE',
	SET_VIEW: 'SET_VIEW',
	SET_PAGE: 'SET_PAGE',
	VIEW_ALL_PLAYERS: 'VIEW_ALL_PLAYERS',
	VIEW_OPTIMIZED_LINEUPS: 'VIEW_OPTIMIZED_LINEUPS',
};

export const loadingTable = (loading: boolean) => ({
	type: TABLE_ACTIONS.LOADING_TABLE,
	loading,
});

export const setView = (view: string) => ({
	type: TABLE_ACTIONS.SET_VIEW,
	view,
});

export const setPage = (page: number) => ({
	type: TABLE_ACTIONS.SET_PAGE,
	page,
});

export const viewAllPlayersAction = () => ({
	type: TABLE_ACTIONS.VIEW_ALL_PLAYERS,
});

export const viewOptimizedLineupsAction = () => ({
	type: TABLE_ACTIONS.VIEW_OPTIMIZED_LINEUPS,
});
