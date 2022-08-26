import { DefaultBodyType, MockedRequest, RestHandler } from 'msw';

import { contestsHandler } from '@/containers/Contests';
import { optimizeHandler } from '@/containers/Optimize';
import { playersHandler } from '@/containers/Players';
import { sportsHandler } from '@/containers/Sports';

export const handlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
	sportsHandler,
	contestsHandler,
	playersHandler,
	optimizeHandler,
];
