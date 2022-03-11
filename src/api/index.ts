import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IDraftKingsContest } from '../interfaces/draftkings/IDraftKingsContest';
import { ISport } from '../interfaces/ISports';
import { IYahooContest } from '../interfaces/yahoo/IYahooContest';
import {
	mapDraftKingsContestsToContests,
	mapYahooContestsToContests,
} from '../scripts/services/mapContests';
import { IContestsResponse, IContestsBody, IPlayersBody } from './interfaces';

export const API = process.env.ENDPOINT;

export const OptidfsApi = createApi({
	reducerPath: 'optidfs',
	baseQuery: fetchBaseQuery({ baseUrl: API }),
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
			transformResponse: (response: any, meta, arg) => {
				const transformedContests =
					response.provider === 'draftkings'
						? mapDraftKingsContestsToContests(
								response.contests as IDraftKingsContest[]
						  )
						: mapYahooContestsToContests(
								response.contests as IYahooContest[]
						  );

				return {
					...response,
					contests: transformedContests,
				} as any;
			},
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
