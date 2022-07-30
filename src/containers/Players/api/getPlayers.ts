import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { TStatus } from 'src/interfaces/Status';

import { IPlayer } from '../models/IPlayer';
import { Providers } from '../models/providers.enum';
import providersMap from '../services/mapPlayers';

interface IGetPlayersResponse {
	players: IPlayer[];
	statusFilters: TStatus[];
}

export interface IGetPlayersBody {
	id: number;
	provider: Providers;
	gameType?: string;
}

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
	builder.query<IGetPlayersResponse, IGetPlayersBody>({
		query: (body) => {
			const params = new URLSearchParams(body as any);

			return `/players?${params.toString()}`;
		},
		transformResponse: (
			response: IGetPlayersResponse,
			meta,
			arg: IGetPlayersBody
		) => ({
			...response,
			players: providersMap.get(arg.provider)!(response.players),
		}),
	});

export { getPlayers };
