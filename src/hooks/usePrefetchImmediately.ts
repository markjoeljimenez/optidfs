import { PrefetchOptions } from '@reduxjs/toolkit/dist/query/core/module';
import { useEffect } from 'react';
import { OptidfsApi } from 'src/api';
import { useAppDispatch } from 'src/hooks';

type EndpointNames = keyof typeof OptidfsApi.endpoints;

export function usePrefetchImmediately<T extends EndpointNames>(
	endpoint: T,
	arg: Parameters<typeof OptidfsApi.endpoints[T]['initiate']>[0],
	options: PrefetchOptions = {}
) {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(OptidfsApi.util.prefetch(endpoint, arg as any, options));
	}, []);
}
