import { RestHandler, MockedRequest, DefaultRequestBody } from 'msw';
import { sportsHandler } from '@/containers/Sports';
import { contestsHandler } from '@/containers/Contests';
import { playersHandler } from '@/containers/Players';

const handlers: RestHandler<MockedRequest<DefaultRequestBody>>[] = [
	sportsHandler,
	contestsHandler,
	playersHandler,
];

export { handlers };
