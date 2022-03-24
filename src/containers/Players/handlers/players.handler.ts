import { rest } from 'msw';
import { yahooPlayersMock } from '../mocks/players.mocks';

const handler = rest.get('http://127.0.0.1:5000/players', (req, res, ctx) => {
	return res(ctx.json(yahooPlayersMock));
});

export default handler;
