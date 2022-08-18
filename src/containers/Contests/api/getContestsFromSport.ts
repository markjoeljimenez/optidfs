import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

import { IContest } from '../interfaces/IContest';
import { IDraftKingsContest } from '../interfaces/IDraftKingsContest';
import { IYahooContest } from '../interfaces/IYahooContest';
import { mapContests } from '../services/mapContests';

interface IContestsBody {
	provider: string;
	sport: string;
	sportId: number;
}

export const getContestsFromSport = (
	builder: EndpointBuilder<
		BaseQueryFn<
			string | FetchArgs,
			unknown,
			FetchBaseQueryError,
			{},
			FetchBaseQueryMeta
		>,
		never,
		'optidfs'
	>
) =>
	builder.query({
		query: (body) => {
			const params = new URLSearchParams(body as any);

			return `/contests?${params.toString()}`;
		},
		transformResponse: (
			response: IDraftKingsContest[] | IYahooContest[],
			meta,
			arg: IContestsBody
		): IContest[] => mapContests(response, arg.provider),
	});
