import { rest } from 'msw';

import {
	filteredOptimizedYahooResponse,
	optimizedYahooResponse,
} from '../mocks';
import { IOptimizeSettings } from '../models';

const { ENDPOINT } = process.env;

export const optimizeHandler = rest.post(
	`${ENDPOINT}/optimize`,
	async (req, res, ctx) => {
		const { settings }: { settings: IOptimizeSettings } = await req.json();

		if (settings.numberOfLineups > 1) {
			const transformedOptimizedYahooLineups =
				optimizedYahooResponse.lineups;

			for (let i = 0; i <= settings.numberOfLineups - 2; i++) {
				transformedOptimizedYahooLineups.push({
					...transformedOptimizedYahooLineups[i],
					fppg: transformedOptimizedYahooLineups[i].fppg + 100,
					salary: transformedOptimizedYahooLineups[i].salary + 100,
				});
			}

			return res(
				ctx.json({
					...optimizedYahooResponse,
					lineups: transformedOptimizedYahooLineups,
				})
			);
		}

		if (settings.statusFilters?.length) {
			return res(ctx.json(filteredOptimizedYahooResponse));
		}

		return res(ctx.json(optimizedYahooResponse));
	}
);
