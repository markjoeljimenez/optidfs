import { rest } from 'msw';

import { optimizedYahooLineups } from '../mocks/optimizedLineups.mocks';

const { ENDPOINT } = process.env;

const handler = rest.post(`${ENDPOINT}/optimize`, async (req, res, ctx) => {
	const body = await req.json();

	if (parseInt(body.settings.numberOfLineups) > 1) {
		const transformedOptimizedYahooLineups = optimizedYahooLineups;

		for (let i = 0; i <= parseInt(body.settings.numberOfLineups) - 2; i++) {
			transformedOptimizedYahooLineups.push({
				...transformedOptimizedYahooLineups[i],
				fppg: transformedOptimizedYahooLineups[i].fppg + 100,
				salary: transformedOptimizedYahooLineups[i].salary + 100,
			});
		}

		return res(ctx.json(transformedOptimizedYahooLineups));
	}

	return res(ctx.json(optimizedYahooLineups));
});

export default handler;
