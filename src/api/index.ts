import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getContestsFromSport } from '@/containers/Contests';
import { getPlayers } from '@/containers/Players';
import { getSportsFromProvider } from '@/containers/Sports';

export const API = process.env.ENDPOINT;

export const OptidfsApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: API }),
	endpoints: (builder) => ({
		getContestsFromSport: getContestsFromSport(builder),
		getPlayers: getPlayers(builder),
		getSportsFromProvider: getSportsFromProvider(builder),
	}),
	reducerPath: 'optidfs',
});

export const {
	useGetContestsFromSportQuery,
	useGetPlayersQuery,
	useGetSportsFromProviderQuery,
} = OptidfsApi;
