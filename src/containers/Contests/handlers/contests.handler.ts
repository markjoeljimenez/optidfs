import { rest } from 'msw';

import { yahooContestsMock } from '../mocks/contests.mocks';

const { ENDPOINT } = process.env;

const handler = rest.post(`${ENDPOINT}/contests`, (req, res, ctx) => {
	return res(ctx.json(yahooContestsMock));
});

export default handler;
