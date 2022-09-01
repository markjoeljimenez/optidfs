import { OptidfsApi } from 'src/api';

import { ISport } from '../interfaces';

export const GetSportsFromProviderExtendedApi = OptidfsApi.injectEndpoints({
	endpoints: (build) => ({
		getSportsFromProvider: build.query<ISport[], string>({
			query: (provider: string) => `?provider=${provider}`,
		}),
	}),
	overrideExisting: false,
});

export const { useGetSportsFromProviderQuery, usePrefetch } =
	GetSportsFromProviderExtendedApi;
