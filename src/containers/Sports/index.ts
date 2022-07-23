import { getSportsFromProvider } from './api/getSportsFromProvider';
import Sports from './components/Sports';
import sportsHandler from './handlers/Sports.handler';
import { ISport } from './interfaces/ISports';
import { draftKingsSportsMock, yahooSportsMock } from './mocks/Sports.mocks';
import SportsReducers, {
	setSelectedSport,
	sportsState,
} from './redux/Sports.reducers';

// Api
export { getSportsFromProvider };

// Handlers
export { sportsHandler };

// Mocks
export { draftKingsSportsMock, yahooSportsMock };

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
