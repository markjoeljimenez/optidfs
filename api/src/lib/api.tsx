import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/* eslint-disable-next-line */
export interface ApiProps {}

export const OptidfsDFSApi = createApi({
	reducerPath: 'OptidfsDFSApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'DFS_ENDPOINT' }),
	endpoints: (builder) => ({
		getProviders: builder.query<any, string>({
			query: (name) => `pokemon/${name}`,
		}),
	}),
});

export const { useGetProvidersQuery } = OptidfsDFSApi;
