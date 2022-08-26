import { useGetOptimizedLineupsMutation } from 'src/api';

export function useGetOptimizedLineupsMutationResponse() {
	return useGetOptimizedLineupsMutation({
		fixedCacheKey: 'optimize',
	});
}
