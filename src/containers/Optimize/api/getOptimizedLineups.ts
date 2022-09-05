import { OptidfsApi } from 'src/api';

import {
	IGetOptimizedLineupsPostBody,
	IGetOptimizedLineupsResponse,
} from '../models';

export const GetOptimizedLineupsExtendedApi = OptidfsApi.injectEndpoints({
	endpoints: (build) => ({
		getOptimizedLineups: build.mutation<
			IGetOptimizedLineupsResponse,
			IGetOptimizedLineupsPostBody
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
