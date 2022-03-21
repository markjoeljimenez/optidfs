import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IDraftKingsContest } from '../interfaces/draftkings/IDraftKingsContest';
import { ISport } from '../interfaces/ISports';
import { IYahooContest } from '../interfaces/yahoo/IYahooContest';
import {
	mapDraftKingsContestsToContests,
	mapYahooContestsToContests,
} from '../scripts/services/mapContests';
import { IContestsResponse, IContestsBody, IPlayersBody } from './interfaces';
import fetch from 'whatwg-fetch';

export const API = process.env.ENDPOINT;

export const OptidfsApi = createApi({
	reducerPath: 'optidfs',
	baseQuery: fetchBaseQuery({ baseUrl: API, fetchFn: fetch }),
	endpoints: (builder) => ({
		getSportsFromProvider: builder.query<ISport[], string>({
			query: (provider) => `?provider=${provider}`,
		}),
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
