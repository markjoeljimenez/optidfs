import { HYDRATE } from 'next-redux-wrapper';
import { SET_PROVIDER } from './Providers.actions';

interface IProviderState {
	provider: string | null;
}

interface ProviderAction extends IProviderState {
	type: string;
	payload: any;
}

const DEFAULT_STATE: IProviderState = {
	provider: null,
};

const ProviderReducers = (
	state = DEFAULT_STATE,
	{ type, provider, payload }: ProviderAction
) => {
	switch (type) {
		case SET_PROVIDER:
			return {
				...state,
				provider,
			};

		default:
			return state;
	}
};

export default ProviderReducers;
