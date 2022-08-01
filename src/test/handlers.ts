import { DefaultBodyType, MockedRequest, RestHandler } from 'msw';

import { contestsHandler } from '@/containers/Contests';
import { optimizeHandler } from '@/containers/Optimize';
import { playersHandler } from '@/containers/Players';
import { sportsHandler } from '@/containers/Sports';

const handlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
	sportsHandler,
	contestsHandler,
	playersHandler,
	optimizeHandler,
];

export { handlers };
