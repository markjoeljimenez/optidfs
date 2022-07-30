import { rest } from 'msw';

import { EProviders, TProviders } from '@/containers/Players';

import { draftKingsSportsMock, yahooSportsMock } from '../mocks/sports.mocks';

const { ENDPOINT } = process.env;

const handler = rest.get(`${ENDPOINT!}`, (req, res, ctx) => {
	const sportsMap = new Map([
		[EProviders.DraftKings, draftKingsSportsMock],
		[EProviders.Yahoo, yahooSportsMock],
	]);

	return res(
		ctx.json(
			sportsMap.get(
				EProviders[req.url.searchParams.get('provider')! as TProviders]
			)
		)
	);
});

export default handler;
