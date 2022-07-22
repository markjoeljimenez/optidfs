import userEvent from '@testing-library/user-event';
import { RootState } from 'src/store';

import { draftKingsContestsMock } from '@/containers/Contests';
import { draftKingsPlayersMock } from '@/containers/Players';
import { render, screen, waitFor } from '@/test/render';

import { draftKingsSportsMock } from '../mocks/sports.mocks';
import Sports from './Sports';

const preloadedState: Partial<RootState> = {
	providers: {
		provider: 'draftkings',
	},
};

describe('Sports', () => {
	it('should match snapshot', () => {
		// Arrange
		const view = render(<Sports />);

		// Assert
		expect(view).toMatchSnapshot();
	});

	describe('Draftkings mocks', () => {
		it('should remain disabled if no provider is selected', async () => {
			// Arrange
			render(<Sports />);

			const sportsSelect = screen.getByTestId(
				'sports-select'
			) as HTMLSelectElement;

			// Assert
			expect(sportsSelect.hasAttribute('disabled')).toBe(true);
		});

		it('should render sports options if provider is selected', async () => {
			// Arrange
			render(<Sports />, {
				preloadedState,
			});

			const sportsSelect = screen.getByTestId(
				'sports-select'
			) as HTMLSelectElement;

			await waitFor(() =>
				expect(sportsSelect.hasAttribute('disabled')).toBe(false)
			);

			// Assert
			expect(sportsSelect.options[1].value).toBe('2');
			expect(sportsSelect.options[2].value).toBe('13');
		});

		it('should set selectedSport on change', async () => {
			// Arrange
			const { store } = render(<Sports />, {
				preloadedState,
			});

			const sportsSelect = screen.getByTestId(
				'sports-select'
			) as HTMLSelectElement;

			await waitFor(() =>
				expect(sportsSelect.hasAttribute('disabled')).toBe(false)
			);

			// Act
			await userEvent.selectOptions(sportsSelect, ['2']);

			// Assert
			expect(store.getState().sports.selectedSport?.sportId).toBe(2);
		});
	});

	describe('Yahoo mocks', () => {
		it('should render sports options if provider is selected', async () => {
			// Arrange
			render(<Sports />, {
				preloadedState: {
					providers: {
						provider: 'yahoo',
					},
				},
			});

			const sportsSelect = screen.getByTestId(
				'sports-select'
			) as HTMLSelectElement;

			await waitFor(() =>
				expect(sportsSelect.hasAttribute('disabled')).toBe(false)
			);

			// Assert
			expect(sportsSelect.options[1].value).toBe('golf');
			expect(sportsSelect.options[2].value).toBe('mlb');
		});

		it('should set selectedSport on change', async () => {
			// Arrange
			const { store } = render(<Sports />, {
				preloadedState: {
					providers: {
						provider: 'yahoo',
					},
				},
			});

			const sportsSelect = screen.getByTestId(
				'sports-select'
			) as HTMLSelectElement;

			await waitFor(() =>
				expect(sportsSelect.hasAttribute('disabled')).toBe(false)
			);

			// Act
			await userEvent.selectOptions(sportsSelect, ['golf']);

			// Assert
			expect(store.getState().sports.selectedSport?.sportId).toBe('golf');
		});
	});

	it('should reset sports, contests, and players if user has already visited site', async () => {
		// Arrange
		const { store } = render(<Sports />, {
			preloadedState: {
				...preloadedState,
				contests: {
					gameType: null,
					selectedContest: draftKingsContestsMock[0],
				},
				global: {
					hasVisited: true,
				},
				players: {
					defaultPlayers: draftKingsPlayersMock,
				},
				sports: {
					selectedSport: draftKingsSportsMock[0],
				},
			},
		});

		const sportsSelect = screen.getByTestId(
			'sports-select'
		) as HTMLSelectElement;

		await waitFor(() =>
			expect(sportsSelect.hasAttribute('disabled')).toBe(false)
		);

		// Act
		await userEvent.selectOptions(sportsSelect, ['13']);

		// Assert
		const { contests, players, providers, sports } = store.getState();
		expect(providers.provider).toBe('draftkings');
		expect(sports.selectedSport).toStrictEqual(draftKingsSportsMock[0]);
		expect(contests.selectedContest).toBeNull();
		expect(players.defaultPlayers).toBeNull();
	});
});
