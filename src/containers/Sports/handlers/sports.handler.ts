import { rest } from 'msw';

import sportsMock from '../mocks/sports.mocks';

const handler = rest.get('http://127.0.0.1:5000', (req, res, ctx) => {
	return res(ctx.json(sportsMock));
});

export default handler;
