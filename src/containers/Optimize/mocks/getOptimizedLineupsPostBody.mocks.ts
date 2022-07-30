import {
	EProviders,
	mapYahooPlayers,
	yahooPlayersMock,
} from '@/containers/Players';
import { yahooSportsMock } from '@/containers/Sports';

import { IGetOptimizedLineupsPostBody } from '../models/IGetOptimizedLineupsPostBody';

export const GetOptimizedLineupsPostBodyMock: IGetOptimizedLineupsPostBody = {
	players: mapYahooPlayers(yahooPlayersMock),
	provider: EProviders.Yahoo,
	settings: {
		numberOfLineups: 1,
		statusFilters: ['N/A', 'DTD'],
	},
	sport: yahooSportsMock[1],
};
