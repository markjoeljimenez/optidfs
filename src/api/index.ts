import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getContestsFromSport } from '@/containers/Contests';
import { getOptimizedLineups } from '@/containers/Optimize';
import { getPlayers } from '@/containers/Players';
import { getSportsFromProvider } from '@/containers/Sports';

export const API = process.env.ENDPOINT;

export const OptidfsApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: API }),
	endpoints: (builder) => ({
		getContestsFromSport: getContestsFromSport(builder),
		getOptimizedLineups: getOptimizedLineups(builder),
		getPlayers: getPlayers(builder),
		getSportsFromProvider: getSportsFromProvider(builder),
	}),
	reducerPath: 'optidfs',
});

export const {
	useGetContestsFromSportQuery,
	useGetOptimizedLineupsMutation,
	useGetPlayersQuery,
	useGetSportsFromProviderQuery,
	usePrefetch,
} = OptidfsApi;
