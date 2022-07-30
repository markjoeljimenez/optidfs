import { DefaultRequestBody, MockedRequest, RestHandler } from 'msw';

import { contestsHandler } from '@/containers/Contests';
import { optimizeHandler } from '@/containers/Optimize';
import { playersHandler } from '@/containers/Players';
import { sportsHandler } from '@/containers/Sports';

const handlers: RestHandler<MockedRequest<DefaultRequestBody>>[] = [
	sportsHandler,
	contestsHandler,
	playersHandler,
	optimizeHandler,
];

export { handlers };
