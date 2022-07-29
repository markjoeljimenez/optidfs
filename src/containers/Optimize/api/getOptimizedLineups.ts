import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

import { IPlayer, Providers } from '@/containers/Players';
import { ISport } from '@/containers/Sports';

import IOptimizedLineup from '../models/IOptimizedLineup';
import IOptimizeSettings from '../models/IOptimizeSettings';

const getOptimizedLineups = (
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
		IOptimizedLineup[],
		{
			players: IPlayer[];
			provider: Providers;
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

export { getOptimizedLineups };
