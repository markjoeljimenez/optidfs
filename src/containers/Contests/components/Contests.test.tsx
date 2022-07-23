import userEvent from '@testing-library/user-event';
import { OptidfsApi } from 'src/api';
import { RootState } from 'src/store';

import Notifications from '@/components/toast/notifications';
import { draftKingsSportsMock } from '@/containers/Sports';
import { render, screen, waitFor } from '@/test/render';

import { draftKingsContestsMock } from '../mocks/contests.mocks';
import Contests from './Contests';

const preloadedState: Partial<RootState> = {
	providers: {
		provider: 'draftkings',
	},
	sports: {
		selectedSport: draftKingsSportsMock[0],
	},
};

const app = (
	<>
		<Contests />
		<Notifications />
	</>
);

describe('Contests', () => {
	const getContestsFromSport =
		OptidfsApi.endpoints.getContestsFromSport.select({
			provider: 'draftkings',
			sport: draftKingsSportsMock[0].regionAbbreviatedSportName,
			sportId: draftKingsSportsMock[0].sportId,
		});

	it('should match snapshot', () => {
		// Arrange
		const view = render(app, { preloadedState });

		// Assert
		expect(view).toMatchSnapshot();
	});

	it('should render options if provider and sport is selected', async () => {
		// Arrange
		const { store } = render(app, { preloadedState });
		await waitFor(() =>
			expect(getContestsFromSport(store.getState()).isSuccess).toBe(true)
		);

		// Act
		const contestsExpandButton = screen.getByRole('button');
		await userEvent.click(contestsExpandButton);

		// Assert
		expect(screen.getAllByRole('option').length).toBeGreaterThan(1);
	});

	it('should set selected contest on contest click', async () => {
		// Arrange
		const { store } = render(app, { preloadedState });
		await waitFor(() =>
			expect(getContestsFromSport(store.getState()).isSuccess).toBe(true)
		);

		// Act
		const contestsExpandButton = screen.getByRole('button');
		await userEvent.click(contestsExpandButton);

		// Get first contest and click
		const firstContest = await waitFor(
			() => screen.getAllByRole('option')[0]
		);
		await userEvent.click(firstContest);

		// Assert
		expect(store.getState().contests.selectedContest).toStrictEqual({
			contest_id: 71728,
			name: 'PGA TOUR $215 3-Player',
		});
	});

	it('should narrow results if searching', async () => {
		// Arrange
		const { store } = render(app, { preloadedState });
		await waitFor(() =>
			expect(getContestsFromSport(store.getState()).isSuccess).toBe(true)
		);

		const contestsSearchInput = screen.getByRole('textbox');

		// Act
		await userEvent.type(contestsSearchInput, 'PGA TOUR $50', {
			delay: 10,
		});

		// Get contest li items
		const contests = screen.getAllByRole('option');

		// Assert
		expect(contests.length).toBeLessThan(draftKingsContestsMock.length);
	});

	it('should display error message if selectedContest id is invalid', async () => {
		// Arrange
		const { store } = render(app, {
			preloadedState: {
				...preloadedState,
				contests: {
					gameType: null,
					selectedContest: {
						contest_id: 12345,
						name: 'Invalid contest',
					},
				},
			},
		});

		await waitFor(() =>
			expect(getContestsFromSport(store.getState()).isSuccess).toBe(true)
		);

		const notification = screen.getByTestId('notification-1');

		// Assert
		expect(notification).toBeInTheDocument();
	});
});
