import {
	draftKingsPlayersMock,
	yahooPlayersMock,
} from '../../mocks/players.mocks';
import { mapDraftKingsPlayers, mapYahooPlayers } from '../mapPlayers';

describe('mapPlayers', () => {
	it('should map Yahoo players', () => {
		// Act
		const transformedPlayers = mapYahooPlayers(yahooPlayersMock.players);

		// Assert
		expect(transformedPlayers[0]).toStrictEqual({
			id: 3382163,
			firstName: 'Chris',
			lastName: 'Paul',
			fppg: 40.48,
			position: 'PG',
			salary: 34,
			team: 'PHO',
			status: 'INJ',
			image: 'https://s.yimg.com/bt/api/res/1.2/skrHvmSZ_g_pJN0s5WtyDg--/YXBwaWQ9ZGFpbHlmYW50YXN5O3E9ODU7Y2M9ODY0MDA7dz0xMjA7aD0xMjA-/https://s.yimg.com/xe/i/us/sp/v/nba_cutout/players_l/10132021/3930.png',
		});
	});

	it('should map DraftKings players', () => {
		// Act
		const transformedPlayers = mapDraftKingsPlayers(
			draftKingsPlayersMock.players
		);

		// Assert
		expect(transformedPlayers[0]).toStrictEqual({
			id: 21805621,
			firstName: 'Giannis',
			lastName: 'Antetokounmpo',
			fppg: 57.99,
			position: 'SF/PF',
			salary: 11700,
			team: 'MIL',
			status: 'OUT',
			draftPositions: 'SF/PF/F/UTIL',
			image: 'https://dkn.gs/sports/images/nba/players/160/33178.png',
		});
	});
});
