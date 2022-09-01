import { OptidfsApi } from 'src/api';

export const GetOptimizedLineupsExtendedApi = OptidfsApi.injectEndpoints({
	endpoints: (build) => ({
		getOptimizedLineups: build.mutation({
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
