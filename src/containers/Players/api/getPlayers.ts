import { EProviders } from '@/containers/Providers';

import { IPlayer, TPlayerStatus } from '../models';
import { mapDraftKingsPlayers, mapYahooPlayers } from '../services';

interface IGetPlayersResponse {
	players: IPlayer[];
	statusFilters: TPlayerStatus[];
}

import { OptidfsApi } from 'src/api';

export const GetPlayersExtendedApi = OptidfsApi.injectEndpoints({
	endpoints: (build) => ({
		getPlayers: build.query({
			query: (body) => {
				const params = new URLSearchParams(body as any);

				return `/players?${params.toString()}`;
			},
			transformResponse: (response: IGetPlayersResponse, meta, arg) => {
				const providersMap = new Map<EProviders, (p: any) => IPlayer[]>(
					[
						[EProviders.DraftKings, mapDraftKingsPlayers],
						[EProviders.Yahoo, mapYahooPlayers],
					]
				);

				return {
					...response,
					players: providersMap.get(arg.provider)!(response.players),
				};
			},
		}),
	}),
	overrideExisting: false,
});

export const { useGetPlayersQuery } = GetPlayersExtendedApi;
