export const SEARCH_PLAYERS = 'SEARCH_PLAYERS';

const searchTerm = (search: string) => ({
	type: SEARCH_PLAYERS,
	search,
});

export default searchTerm;
