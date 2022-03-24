import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { IPlayersBody } from 'src/api/interfaces';

const getPlayers = (
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
	builder.query<any, IPlayersBody>({
		query: (body) => {
			const params = new URLSearchParams(body as any);

			return `players?${params.toString()}`;
		},
	});

export { getPlayers };
