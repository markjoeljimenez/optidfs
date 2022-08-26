import { EProviders } from '../models';
import { ProviderReducers, setProvider } from './Providers.reducers';

describe('Providers reducers', () => {
	it('should return the initial state', () => {
		expect(ProviderReducers.reducer(undefined, {} as any)).toEqual({
			provider: null,
		});
	});

	it('should set provider successfully', () => {
		const state = ProviderReducers.reducer(
			undefined,
			setProvider(EProviders.Yahoo)
		);

		expect(state.provider).toBe(EProviders.Yahoo);
	});
});
