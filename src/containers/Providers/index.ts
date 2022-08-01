import Providers from './components/Providers';
import providers from './data/providers';
import { EProviders } from './models/EProviders';
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

// Models
export { EProviders };

// State
export { providersState };

// Component
export default Providers;
