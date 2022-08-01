import { rest } from 'msw';

import { EProviders } from '@/containers/Providers';

import { draftKingsSportsMock, yahooSportsMock } from '../mocks/sports.mocks';

const { ENDPOINT } = process.env;

const handler = rest.get(`${ENDPOINT!}`, (req, res, ctx) => {
	const sportsMap = new Map([
		[EProviders.DraftKings, draftKingsSportsMock],
		[EProviders.Yahoo, yahooSportsMock],
	]);

	return res(
		ctx.json(
			sportsMap.get(req.url.searchParams.get('provider')! as EProviders)
		)
	);
});

export default handler;
