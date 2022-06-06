import Providers from './components/Providers';
import ProvidersReducer, {
	selectProviders,
	setProvider,
} from './redux/Providers.reducers';

// Reducer
export { ProvidersReducer };

// Actions
export { setProvider };

// State
export { selectProviders };

// Component
export default Providers;
