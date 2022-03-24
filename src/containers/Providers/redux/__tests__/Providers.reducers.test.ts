import ProviderReducers, { setProvider } from '../Providers.reducers';

describe('Providers reducers', () => {
	it('should return the initial state', () => {
		expect(ProviderReducers(undefined, {} as any)).toEqual({
			provider: null,
		});
	});

	it('should set provider successfully', () => {
		const state = ProviderReducers(undefined, setProvider('yahoo'));

		expect(state.provider).toBe('yahoo');
	});
});
