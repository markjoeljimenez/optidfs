import { useGetOptimizedLineupsMutation } from 'src/api';

export default function useGetOptimizedLineupsMutationResponse() {
	return useGetOptimizedLineupsMutation({
		fixedCacheKey: 'optimize',
	});
}
