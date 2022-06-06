import { DefaultRequestBody,MockedRequest, RestHandler } from 'msw';

import { contestsHandler } from '@/containers/Contests';
import { playersHandler } from '@/containers/Players';
import { sportsHandler } from '@/containers/Sports';

const handlers: RestHandler<MockedRequest<DefaultRequestBody>>[] = [
	sportsHandler,
	contestsHandler,
	playersHandler,
];

export { handlers };
