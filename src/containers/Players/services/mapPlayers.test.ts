import {
	draftKingsPlayersMock,
	yahooPlayersMock,
} from '../mocks/players.mocks';
import { mapDraftKingsPlayers, mapYahooPlayers } from '../services/mapPlayers';

describe('mapPlayers', () => {
	it('should map Yahoo players', () => {
		// Act
		const transformedPlayers = mapYahooPlayers(yahooPlayersMock);

		// Assert
		expect(transformedPlayers[0]).toStrictEqual({
			firstName: 'Evan',
			fppg: 6.17,
			id: 'mlb.p.7914$mlb.g.2412825',
			image: 'https://s.yimg.com/bt/api/res/1.2/cKW.Ppnn9bm2fP9RlfKviQ--/YXBwaWQ9ZGFpbHlmYW50YXN5O3E9ODU7Y2M9ODY0MDA7dz0xMjA7aD0xMjA-/https://s.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/05092022/7914.png',
			lastName: 'Longoria',
			position: '3B',
			salary: 7,
			status: 'IL10',
			team: 'SF',
		});
	});

	it('should map DraftKings players', () => {
		// Act
		const transformedPlayers = mapDraftKingsPlayers(draftKingsPlayersMock);

		// Assert
		expect(transformedPlayers[0]).toStrictEqual({
			draftPositions: 'RB/FLEX',
			firstName: 'Alvin',
			fppg: 22.09,
			id: 23397617,
			image: 'https://dkn.gs/sports/images/nfl/players/160/18573.png',
			lastName: 'Kamara',
			position: 'RB',
			salary: 8500,
			status: 'None',
			team: 'NO',
		});
	});
});
