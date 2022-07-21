import { getPlayers } from './api/getPlayers';
import playersHandler from './handlers/players.handler';
import { draftKingsPlayersMock, yahooPlayersMock } from './mocks/players.mocks';
import { IDraftKingsPlayer } from './models/IDraftKingsPlayer';
import { IPlayer } from './models/IPlayer';
import { IYahooPlayer } from './models/IYahooPlayer';
import { Providers } from './models/providers.enum';
import PlayersReducers, {
	playersState,
	setDefaultPlayers,
} from './redux/reducers';
import { mapDraftKingsPlayers, mapYahooPlayers } from './services/mapPlayers';

// Api
export { getPlayers };

// Mocks
export { draftKingsPlayersMock, yahooPlayersMock };

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

// Models
export type { IDraftKingsPlayer, IPlayer, IYahooPlayer, Providers };
