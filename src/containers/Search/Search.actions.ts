export const SEARCH_PLAYERS = 'SEARCH_PLAYERS';

const handleSearch = (searchTerm) => ({
	type: SEARCH_PLAYERS,
	searchTerm,
});

export default handleSearch;
