import {
	draftKingsContestsMock,
	yahooContestsMock,
} from '../mocks/Contests.mocks';
import { mapDraftKingsContests, mapYahooContests } from './mapContests';

describe('mapContests', () => {
	it('should map DraftKings', () => {
		// Act
		const transformedContests = mapDraftKingsContests(
			draftKingsContestsMock
		);

		// Assert
		expect(transformedContests[0]).toStrictEqual({
			contest_id: 71728,
			name: 'PGA TOUR $215 3-Player',
			// gameType: 'Classic',
		});
	});

	it('should map Yahoo', () => {
		// Act
		const transformedContests = mapYahooContests(yahooContestsMock);

		// Assert
		expect(transformedContests[0]).toStrictEqual({
			contest_id: 11109513,
			name: 'PGA $20K Thursday Baller [$4K to 1st]',
		});
	});
});
