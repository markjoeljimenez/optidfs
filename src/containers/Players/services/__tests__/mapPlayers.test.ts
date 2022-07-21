import {
	draftKingsPlayersMock,
	yahooPlayersMock,
} from '../../mocks/players.mocks';
import { mapDraftKingsPlayers, mapYahooPlayers } from '../mapPlayers';

describe('mapPlayers', () => {
	it('should map Yahoo players', () => {
		// Act
		const transformedPlayers = mapYahooPlayers(yahooPlayersMock);

		// Assert
		expect(transformedPlayers[0]).toStrictEqual({
			id: 3567649,
			firstName: 'Evan',
			lastName: 'Longoria',
			fppg: 6.11,
			position: '3B',
			salary: 13,
			team: 'SF',
			status: 'N/A',
			image: 'https://s.yimg.com/bt/api/res/1.2/cKW.Ppnn9bm2fP9RlfKviQ--/YXBwaWQ9ZGFpbHlmYW50YXN5O3E9ODU7Y2M9ODY0MDA7dz0xMjA7aD0xMjA-/https://s.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/05092022/7914.png',
		});
	});

	it('should map DraftKings players', () => {
		// Act
		const transformedPlayers = mapDraftKingsPlayers(draftKingsPlayersMock);

		// Assert
		expect(transformedPlayers[0]).toStrictEqual({
			id: 23397617,
			firstName: 'Alvin',
			lastName: 'Kamara',
			fppg: 22.09,
			position: 'RB',
			salary: 8500,
			team: 'NO',
			status: 'Active',
			draftPositions: 'RB/FLEX',
			image: 'https://dkn.gs/sports/images/nfl/players/160/18573.png',
		});
	});
});
