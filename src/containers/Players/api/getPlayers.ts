import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

import { EProviders } from '@/containers/Providers';

import { IPlayer } from '../models/IPlayer';
import { TPlayerStatus } from '../models/IPlayerStatus';
import { mapDraftKingsPlayers, mapYahooPlayers } from '../services/mapPlayers';

interface IGetPlayersResponse {
	players: IPlayer[];
	statusFilters: TPlayerStatus[];
}

interface IGetPlayersBody {
	id: number;
	provider: EProviders;
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
		transformResponse: (response: IGetPlayersResponse, meta, arg) => {
			const providersMap = new Map<EProviders, (p: any) => IPlayer[]>([
				[EProviders.DraftKings, mapDraftKingsPlayers],
				[EProviders.Yahoo, mapYahooPlayers],
			]);

			return {
				...response,
				players: providersMap.get(arg.provider)!(response.players),
			};
		},
	});

export { getPlayers };
