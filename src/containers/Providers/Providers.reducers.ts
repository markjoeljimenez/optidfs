import { SET_PROVIDER } from './Providers.actions';

const ProviderReducers = (state = null, { type, provider }) => {
	switch (type) {
		case SET_PROVIDER:
			return provider;

		default:
			return state;
	}
};

export default ProviderReducers;
