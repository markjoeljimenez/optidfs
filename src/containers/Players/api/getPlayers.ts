import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { IPlayersBody } from 'src/api/interfaces';

import { IDraftKingsPlayer } from '../models/IDraftKingsPlayer';
import { IPlayer } from '../models/IPlayer';
import { IYahooPlayer } from '../models/IYahooPlayer';
import providersMap from '../services/mapPlayers';

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
		transformResponse: (
			response: (IDraftKingsPlayer | IYahooPlayer)[],
			meta,
			arg: IPlayersBody
		): IPlayer[] => providersMap(response).get(arg.provider)!,
	});

export { getPlayers };
