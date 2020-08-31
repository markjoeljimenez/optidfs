const getPlayers = (draftGroupId) => ({
	type: 'GET_PLAYERS',
	payload: draftGroupId,
});

export default getPlayers;
