import { getSportsFromProvider } from './api/getSportsFromProvider';
import Sports from './components/Sports';
import sportsHandler from './handlers/sports.handler';
import { ISport } from './interfaces/ISports';
import sportsMock from './mocks/sports.mocks';
import SportsReducers, {
	setSelectedSport,
	sportsState,
} from './redux/reducers';

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
