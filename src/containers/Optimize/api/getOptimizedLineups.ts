import { OptidfsApi } from 'src/api';

import { IGetOptimizedLineupsResponse } from '../models';

export const GetOptimizedLineupsExtendedApi = OptidfsApi.injectEndpoints({
	endpoints: (build) => ({
		getOptimizedLineups: build.mutation<
			IGetOptimizedLineupsResponse,
			string
		>({
			query: (body) => {
				return {
					body,
					method: 'POST',
					url: '/optimize',
				};
			},
		}),
	}),
	overrideExisting: false,
});

export const { useGetOptimizedLineupsMutation } =
	GetOptimizedLineupsExtendedApi;
