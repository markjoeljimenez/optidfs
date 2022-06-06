import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { IContestsBody,IContestsResponse } from 'src/api/interfaces';

import { IContest } from '../interfaces/IContest';
import { mapContests } from '../services/mapContests';

interface IContestTransformedResponse {
	contests: IContest[];
}

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
		query: (body) => ({
			url: 'contests',
			method: 'POST',
			body,
		}),
		transformResponse: (
			response: IContestsResponse,
			meta,
			arg: IContestsBody
		): IContestTransformedResponse => {
			return {
				contests: mapContests(response.contests, arg.provider),
			};
		},
	});

export { getContestsFromSport };
