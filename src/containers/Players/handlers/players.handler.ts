import { rest } from 'msw';

import { yahooPlayersMock } from '../mocks/players.mocks';

const { ENDPOINT } = process.env;

const handler = rest.get(`${ENDPOINT}/players`, (req, res, ctx) => {
	return res(ctx.json(yahooPlayersMock));
});

export default handler;
