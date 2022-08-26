import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

import { IPlayer } from '@/containers/Players';
import { EProviders } from '@/containers/Providers';
import { ISport } from '@/containers/Sports';

import { IGetOptimizedLineupsResponse, IOptimizeSettings } from '../models';

export const getOptimizedLineups = (
	builder: EndpointBuilder<
		BaseQueryFn<
			string | FetchArgs,
			unknown,
			FetchBaseQueryError,
			{},
			FetchBaseQueryMeta
		>,
		never,
		'optidfs'
	>
) =>
	builder.mutation<
		IGetOptimizedLineupsResponse,
		{
			players: IPlayer[];
			provider: EProviders;
			settings: IOptimizeSettings;
			sport: ISport;
		}
	>({
		query: (body) => {
			return {
				body,
				method: 'POST',
				url: '/optimize',
			};
		},
	});
