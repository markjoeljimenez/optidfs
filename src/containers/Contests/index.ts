import { getContestsFromSport } from './api/getContestsFromSport';
import Contests from './components/Contests';
import contestsHandler from './handlers/contests.handler';
import { IContest } from './interfaces/IContest';
import { IDraftKingsContest } from './interfaces/IDraftKingsContest';
import { IYahooContest } from './interfaces/IYahooContest';
import {
	draftKingsContestsMock,
	yahooContestsMock,
} from './mocks/Contests.mocks';
import ContestsReducers, {
	contestsState,
	setGameType,
	setSelectedContest,
} from './redux/Contests.reducers';
import {
	mapContests,
	mapDraftKingsContests,
	mapYahooContests,
} from './services/mapContests';

// Api
export { getContestsFromSport };

// Mocks
export { draftKingsContestsMock, yahooContestsMock };

// Handler
export { contestsHandler };

// Reducers
export { ContestsReducers };

// Actions
export { setGameType, setSelectedContest };

// State
export { contestsState };

// Services
export { mapContests, mapDraftKingsContests, mapYahooContests };

// Interfaces
export type { IContest, IDraftKingsContest, IYahooContest };

// Components
export default Contests;
