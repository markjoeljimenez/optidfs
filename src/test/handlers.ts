import { RestHandler, MockedRequest, DefaultRequestBody } from 'msw';
import { sportsHandler } from '@/containers/Sports';
import { contestsHandler } from '@/containers/Contests';

const handlers: RestHandler<MockedRequest<DefaultRequestBody>>[] = [
	sportsHandler,
	contestsHandler,
];

export { handlers };
