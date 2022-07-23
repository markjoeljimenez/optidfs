import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { IContestsBody, IContestsResponse } from 'src/api/interfaces';

import { IContest } from '../interfaces/IContest';
import { mapContests } from '../services/mapContests';

const getContestsFromSport = (
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
			response: IContestsResponse,
			meta,
			arg: IContestsBody
		): IContest[] => mapContests(response, arg.provider),
	});

export { getContestsFromSport };
