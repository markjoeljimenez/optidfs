import { rest } from 'msw';

import { yahooPlayersMock } from '../mocks/';

const { ENDPOINT } = process.env;

export const playersHandler = rest.get(
	`${ENDPOINT}/players`,
	(req, res, ctx) => {
		return res(
			ctx.json({
				players: yahooPlayersMock,
				statusFilters: ['N/A', 'IL10', 'DTD'],
			})
		);
	}
);
