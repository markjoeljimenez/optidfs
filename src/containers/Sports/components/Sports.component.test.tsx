import userEvent from '@testing-library/user-event';
import { RootState } from 'src/store';

import {
	draftKingsContestsMock,
	GetContestsFromSportExtendedApi,
} from '@/containers/Contests';
import { EProviders } from '@/containers/Providers';
import { render, screen, waitFor } from '@/test/render';

import { GetSportsFromProviderExtendedApi } from '../api';
import { draftKingsSportsMock } from '../mocks/sports.mocks';
import { Sports } from './Sports.component';

const preloadedState: Partial<RootState> = {
	providers: {
		provider: EProviders.DraftKings,
	},
};

const app = (
	<>
		<Sports />
	</>
);

describe('Sports', () => {
	const getSportsFromProvider =
		GetSportsFromProviderExtendedApi.endpoints.getSportsFromProvider.select(
			EProviders.DraftKings
		);

	it('should match snapshot', async () => {
		// Arrange
		const view = render(app, { preloadedState });
		await waitFor(() =>
			expect(getSportsFromProvider(view.store.getState()).isSuccess).toBe(
				true
			)
		);

		// Assert
		expect(view).toMatchSnapshot();
	});

	describe('Draftkings mocks', () => {
		it('should remain disabled if no provider is selected', async () => {
			// Arrange
			render(app, {
				preloadedState: {
					providers: {
						provider: null,
					},
				},
			});

			const sportsSelect = screen.getByTestId('sports-select');

			// Assert
			expect(sportsSelect.hasAttribute('disabled')).toBe(true);
		});

		it('should render sports options if provider is selected', async () => {
			// Arrange
			const { store } = render(app, { preloadedState });
			await waitFor(() =>
				expect(getSportsFromProvider(store.getState()).isSuccess).toBe(
					true
				)
			);

			const sportsSelect =
				screen.getByTestId<HTMLSelectElement>('sports-select');

			await waitFor(() =>
				expect(sportsSelect.hasAttribute('disabled')).toBe(false)
			);

			// Assert
			expect(sportsSelect.options[1].value).toBe('2');
			expect(sportsSelect.options[2].value).toBe('13');
		});

		it('should set selectedSport on change', async () => {
			// Arrange
			const { store } = render(app, { preloadedState });
			await waitFor(() =>
				expect(getSportsFromProvider(store.getState()).isSuccess).toBe(
					true
				)
			);

			const sportsSelect = screen.getByTestId('sports-select');

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
		const getSportsFromProvider =
			GetSportsFromProviderExtendedApi.endpoints.getSportsFromProvider.select(
				EProviders.Yahoo
			);

		it('should render sports options if provider is selected', async () => {
			// Arrange
			const { store } = render(app, {
				preloadedState: {
					providers: {
						provider: EProviders.Yahoo,
					},
				},
			});
			await waitFor(() =>
				expect(getSportsFromProvider(store.getState()).isSuccess).toBe(
					true
				)
			);

			const sportsSelect =
				screen.getByTestId<HTMLSelectElement>('sports-select');

			await waitFor(() =>
				expect(sportsSelect.hasAttribute('disabled')).toBe(false)
			);

			// Assert
			expect(sportsSelect.options[1].value).toBe('golf');
			expect(sportsSelect.options[2].value).toBe('mlb');
		});

		it('should set selectedSport on change', async () => {
			// Arrange
			const { store } = render(app, {
				preloadedState: {
					providers: {
						provider: EProviders.Yahoo,
					},
				},
			});
			await waitFor(() =>
				expect(getSportsFromProvider(store.getState()).isSuccess).toBe(
					true
				)
			);

			const sportsSelect = screen.getByTestId('sports-select');

			await waitFor(() =>
				expect(sportsSelect.hasAttribute('disabled')).toBe(false)
			);

			// Act
			await userEvent.selectOptions(sportsSelect, ['golf']);

			// Assert
			expect(store.getState().sports.selectedSport?.sportId).toBe('golf');
		});
	});

	it('should reset sports and contests if user has already visited site', async () => {
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
				sports: {
					selectedSport: draftKingsSportsMock[0],
				},
			},
		});
		await waitFor(() =>
			expect(getSportsFromProvider(store.getState()).isSuccess).toBe(true)
		);

		const sportsSelect = screen.getByTestId('sports-select');

		await waitFor(() =>
			expect(sportsSelect.hasAttribute('disabled')).toBe(false)
		);

		// Act
		await userEvent.selectOptions(sportsSelect, ['13']);

		// Assert
		const { contests, providers, sports } = store.getState();
		expect(providers.provider).toBe(EProviders.DraftKings);
		expect(sports.selectedSport).toStrictEqual(draftKingsSportsMock[0]);
		expect(contests.selectedContest).toBeNull();
	});

	it('should prefetch contests', async () => {
		// Arrange
		const { store } = render(<Sports />, { preloadedState });
		await waitFor(() =>
			expect(getSportsFromProvider(store.getState()).isSuccess).toBe(true)
		);

		const sportsSelect = screen.getByTestId('sports-select');

		await waitFor(() =>
			expect(sportsSelect.hasAttribute('disabled')).toBe(false)
		);

		// Act
		await userEvent.selectOptions(sportsSelect, ['2']);

		// Assert
		const { providers, sports } = store.getState();
		const getContestsFromSport =
			GetContestsFromSportExtendedApi.endpoints.getContestsFromSport.select(
				{
					provider: providers.provider,
					sport: sports.selectedSport?.regionAbbreviatedSportName,
					sportId: sports.selectedSport?.sportId,
				}
			);

		await waitFor(() => {
			expect(getContestsFromSport(store.getState()).isSuccess).toBe(true);
			expect(getContestsFromSport(store.getState()).data?.length).toBe(3);
		});
	});
});