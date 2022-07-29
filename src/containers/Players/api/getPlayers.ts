import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { Status } from 'src/interfaces/IStatus';

import { IDraftKingsPlayer } from '../models/IDraftKingsPlayer';
import { IPlayer } from '../models/IPlayer';
import { IYahooPlayer } from '../models/IYahooPlayer';
import { Providers } from '../models/providers.enum';
import providersMap from '../services/mapPlayers';

interface IGetPlayersResponse {
	players: IPlayer[];
	statusFilters: (keyof typeof Status)[];
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
