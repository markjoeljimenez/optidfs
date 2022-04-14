import { getSportsFromProvider } from './api/getSportsFromProvider';
import sportsHandler from './handlers/sports.handler';
import sportsMock from './mocks/sports.mocks';
import SportsReducers, {
	sportsState,
	setSelectedSport,
} from './redux/reducers';
import { ISport } from './interfaces/ISports';
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

// Interfaces
export type { ISport };

// Components
export default Sports;
