import { OptidfsApi } from 'src/api';

import { IContest, IDraftKingsContest, IYahooContest } from '../interfaces';
import { mapContests } from '../services';

interface IContestsBody {
	provider: string;
	sport: string;
	sportId: number;
}

export const GetContestsFromSportExtendedApi = OptidfsApi.injectEndpoints({
	endpoints: (build) => ({
		getContestsFromSport: build.query({
			query: (body) => {
				const params = new URLSearchParams(body as any);

				return `/contests?${params.toString()}`;
			},
			transformResponse: (
				response: IDraftKingsContest[] | IYahooContest[],
				meta,
				arg: IContestsBody
			): IContest[] => mapContests(response, arg.provider),
		}),
	}),
	overrideExisting: false,
});

export const { useGetContestsFromSportQuery, usePrefetch } =
	GetContestsFromSportExtendedApi;
