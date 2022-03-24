import { rest } from 'msw';
import { yahooContestsMock } from '../mocks/contests.mocks';

const handler = rest.get('http://127.0.0.1:5000/contests', (req, res, ctx) => {
	return res(ctx.json(yahooContestsMock));
});

export default handler;
