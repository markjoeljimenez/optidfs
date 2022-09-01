import { IContest } from '../interfaces';
import {
	ContestsReducers,
	setGameType,
	setSelectedContest,
} from './Contests.reducers';

describe('Contests reducers', () => {
	it('should return the initial state', () => {
		expect(ContestsReducers.reducer(undefined, {} as any)).toEqual({
			gameType: null,
			selectedContest: null,
		});
	});

	it('should set gameType successfully', () => {
		const gameType = 'test';
		const state = ContestsReducers.reducer(
			undefined,
			setGameType(gameType)
		);

		expect(state.gameType).toBe(gameType);
	});

	it('should set selectedContest successfully', () => {
		const selectedContest: IContest = {
			contest_id: 1,
			name: 'test contest',
		};
		const state = ContestsReducers.reducer(
			undefined,
			setSelectedContest(selectedContest)
		);

		expect(state.selectedContest).toBe(selectedContest);
	});
});
