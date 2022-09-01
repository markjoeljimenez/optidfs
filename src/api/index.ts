import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API = process.env.ENDPOINT;

export const OptidfsApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: API }),
	endpoints: () => ({}),
	reducerPath: 'optidfs',
});
