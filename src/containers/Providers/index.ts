import Providers from './components/Providers';
import providers from './data/providers';
import ProvidersReducer, {
	providersState,
	setProvider,
} from './redux/Providers.reducers';

// Data
export { providers };

// Reducer
export { ProvidersReducer };

// Actions
export { setProvider };

// State
export { providersState };

// Component
export default Providers;
