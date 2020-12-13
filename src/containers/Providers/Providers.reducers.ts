import { SET_PROVIDER } from './Providers.actions';

const DEFAULT_STATE = true;

const ProviderReducers = (state = DEFAULT_STATE, { type, provider }) => {
	switch (type) {
		case SET_PROVIDER:
			return provider;

		default:
			return state;
	}
};

export default ProviderReducers;
