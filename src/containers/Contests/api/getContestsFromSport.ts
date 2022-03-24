import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { IContestsResponse, IContestsBody } from 'src/api/interfaces';

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
	builder.query<IContestsResponse, IContestsBody>({
		query: (body) => ({
			url: 'contests',
			method: 'POST',
			body,
		}),
	});

export { getContestsFromSport };
