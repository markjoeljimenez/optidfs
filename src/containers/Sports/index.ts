import { getSportsFromProvider } from './api/getSportsFromProvider';
import sportsHandler from './handlers/sports.handler';
import sportsMock from './mocks/sports.mocks';
import SportsReducers, {
	sportsState,
	setSelectedSport,
} from './redux/reducers';
import Sports from './components/Sports';

// Api
export { getSportsFromProvider };

// Handlers
export { sportsHandler };

// Mocks
export { sportsMock };

// Reducers
export { SportsReducers };

// Actions
export { setSelectedSport };

// State
export { sportsState };

// Components
export default Sports;
