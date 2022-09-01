import { mapYahooPlayers, yahooPlayersMock } from '@/containers/Players';
import { EProviders } from '@/containers/Providers';
import { yahooSportsMock } from '@/containers/Sports';

import { IGetOptimizedLineupsPostBody } from '../models';

export const GetOptimizedLineupsPostBodyMock: IGetOptimizedLineupsPostBody = {
	players: mapYahooPlayers(yahooPlayersMock),
	provider: EProviders.Yahoo,
	settings: {
		excludedPlayers: [],
		lockedPlayers: [],
		numberOfLineups: 1,
		statusFilters: ['N/A', 'DTD'],
	},
	sport: yahooSportsMock[1],
};
