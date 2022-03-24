import Providers from './components/Providers';
import ProvidersReducer, {
	setProvider,
	selectProviders,
} from './redux/reducers';
import { getSportsFromProvider } from './api/getSportsFromProvider';

// Reducer
export { ProvidersReducer };

// Api
export { getSportsFromProvider };

// Actions
export { setProvider };

// State
export { selectProviders };

// Component
export default Providers;
