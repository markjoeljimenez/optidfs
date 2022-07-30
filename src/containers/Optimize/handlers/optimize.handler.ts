import { rest } from 'msw';

import { optimizedYahooLineups } from '../mocks/optimizedLineups.mocks';

const { ENDPOINT } = process.env;

const handler = rest.post(`${ENDPOINT}/optimize`, (req, res, ctx) => {
	return res(ctx.json(optimizedYahooLineups));
});

export default handler;
