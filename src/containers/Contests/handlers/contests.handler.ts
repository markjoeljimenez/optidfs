import { rest } from 'msw';

import { draftKingsContestsMock } from '../mocks/contests.mocks';

const { ENDPOINT } = process.env;

export const contestsHandler = rest.get(
	`${ENDPOINT}/contests`,
	(req, res, ctx) => {
		return res(ctx.json(draftKingsContestsMock));
	}
);
