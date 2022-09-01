import { useGetOptimizedLineupsMutation } from '../api';

export function useGetOptimizedLineupsMutationResponse() {
	return useGetOptimizedLineupsMutation({
		fixedCacheKey: 'optimize',
	});
}
