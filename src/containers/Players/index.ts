import { getPlayers } from './api/getPlayers';
import { draftKingsPlayersMock, yahooPlayersMock } from './mocks/players.mocks';
import playersHandler from './handlers/players.handler';
import PlayersReducers, {
	setDefaultPlayers,
	playersState,
} from './redux/reducers';
import { mapDraftKingsPlayers, mapYahooPlayers } from './services/mapPlayers';
import { IDraftKingsPlayer } from './interfaces/IDraftKingsPlayer';
import { IPlayer } from './interfaces/IPlayer';
import { IYahooPlayer } from './interfaces/IYahooPlayer';

// Api
export { getPlayers };

// Mocks
export { yahooPlayersMock, draftKingsPlayersMock };

// Handler
export { playersHandler };

// Reducers
export { PlayersReducers };

// Actions
export { setDefaultPlayers };

// State
export { playersState };

// Services
export { mapDraftKingsPlayers, mapYahooPlayers };

// Interfaces
export type { IYahooPlayer, IDraftKingsPlayer, IPlayer };
