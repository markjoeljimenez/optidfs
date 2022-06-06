import 'whatwg-fetch';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { server } from './src/test/server';

require('dotenv').config();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
