import { rest } from 'msw';

import { yahooPlayersMock } from '../mocks/players.mocks';
import { IYahooPlayer } from '../models/IYahooPlayer';

const { ENDPOINT } = process.env;

const handler = rest.get(`${ENDPOINT}/players`, (req, res, ctx) => {
	return res(
		ctx.json({
			players: yahooPlayersMock,
			statusFilters: ['N/A', 'IL10', 'DTD'],
		})
	);
});

export default handler;
