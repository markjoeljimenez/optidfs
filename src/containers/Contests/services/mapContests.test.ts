import {
	draftKingsContestsMock,
	yahooContestsMock,
} from '../mocks/contests.mocks';
import { mapDraftKingsContests, mapYahooContests } from './mapContests';

describe('mapContests', () => {
	it('should map DraftKings', () => {
		// Act
		const transformedContests = mapDraftKingsContests(
			draftKingsContestsMock.contests
		);

		// Assert
		expect(transformedContests[0]).toStrictEqual({
			id: 65923,
			name: 'NBA $300K Swish [$100K to 1st]',
			gameType: 'Classic',
		});
	});

	it('should map Yahoo', () => {
		// Act
		const transformedContests = mapYahooContests(
			yahooContestsMock.contests
		);

		// Assert
		expect(transformedContests[0]).toStrictEqual({
			id: 10632517,
			name: 'NBA $10 10-Team Group',
		});
	});
});
