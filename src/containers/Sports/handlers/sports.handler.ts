import { rest } from 'msw';

import { draftKingsSportsMock, yahooSportsMock } from '../mocks/sports.mocks';

const { ENDPOINT } = process.env;

const handler = rest.get(`${ENDPOINT!}`, (req, res, ctx) => {
	const sportsMap = new Map([
		['draftkings', draftKingsSportsMock],
		['yahoo', yahooSportsMock],
	]);

	return res(ctx.json(sportsMap.get(req.url.searchParams.get('provider')!)));
});

export default handler;
