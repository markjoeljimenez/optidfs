import { RestHandler, MockedRequest, DefaultRequestBody } from 'msw';
import { sportsHandler } from '@/containers/Sports';

const handlers: RestHandler<MockedRequest<DefaultRequestBody>>[] = [
	sportsHandler,
];

export { handlers };
