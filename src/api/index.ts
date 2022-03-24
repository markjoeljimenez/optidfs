import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSportsFromProvider } from '@/containers/Providers';
import { IContestsResponse, IContestsBody, IPlayersBody } from './interfaces';

export const API = process.env.ENDPOINT;

export const OptidfsApi = createApi({
	reducerPath: 'optidfs',
	baseQuery: fetchBaseQuery({ baseUrl: API }),
	endpoints: (builder) => ({
		getSportsFromProvider: getSportsFromProvider(builder),
		getContestsFromSport: builder.query<IContestsResponse, IContestsBody>({
			query: (body) => ({
				url: 'contests',
				method: 'POST',
				body,
			}),
		}),
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
