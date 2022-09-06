import { OptidfsApi } from 'src/api';

import { EProviders } from '@/containers/Providers';

import { IPlayer } from '../models';
import { IGetPlayersResponse } from '../models/IGetPlayersResponse';
import { mapDraftKingsPlayers, mapYahooPlayers } from '../services';

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
