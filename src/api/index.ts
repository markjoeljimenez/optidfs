import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSportsFromProvider } from '@/containers/Sports';
import { IPlayersBody } from './interfaces';
import { getContestsFromSport } from '@/containers/Contests';

export const API = process.env.ENDPOINT;

export const OptidfsApi = createApi({
	reducerPath: 'optidfs',
	baseQuery: fetchBaseQuery({ baseUrl: API }),
	endpoints: (builder) => ({
		getSportsFromProvider: getSportsFromProvider(builder),
		getContestsFromSport: getContestsFromSport(builder),
		getPlayers: builder.query<any, IPlayersBody>({
			query: (body) => {
				const params = new URLSearchParams(body as any);

				return `players?${params.toString()}`;
			},
		}),
	}),
});

export const {
	useGetSportsFromProviderQuery,
	useGetContestsFromSportQuery,
	useGetPlayersQuery,
} = OptidfsApi;
