import { rest } from 'msw';

import { draftKingsContestsMock } from '../mocks/Contests.mocks';

const { ENDPOINT } = process.env;

const handler = rest.get(`${ENDPOINT}/contests`, (req, res, ctx) => {
	return res(ctx.json(draftKingsContestsMock));
});

export default handler;
