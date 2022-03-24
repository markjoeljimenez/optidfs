import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSportsFromProvider } from '@/containers/Sports';
import { getContestsFromSport } from '@/containers/Contests';
import { getPlayers } from '@/containers/Players';

export const API = process.env.ENDPOINT;

export const OptidfsApi = createApi({
	reducerPath: 'optidfs',
	baseQuery: fetchBaseQuery({ baseUrl: API }),
	endpoints: (builder) => ({
		getSportsFromProvider: getSportsFromProvider(builder),
		getContestsFromSport: getContestsFromSport(builder),
		getPlayers: getPlayers(builder),
	}),
});

export const {
	useGetSportsFromProviderQuery,
	useGetContestsFromSportQuery,
	useGetPlayersQuery,
} = OptidfsApi;
