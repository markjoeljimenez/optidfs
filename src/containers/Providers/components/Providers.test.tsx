import userEvent from '@testing-library/user-event';

import { draftKingsContestsMock } from '@/containers/Contests';
import { draftKingsSportsMock } from '@/containers/Sports';
import { render, screen } from '@/test/render';

import { EProviders } from '../models/EProviders';
import Providers from './Providers';

describe('Providers', () => {
	it('should match snapshot', () => {
		// Arrange
		const view = render(<Providers />);

		// Assert
		expect(view).toMatchSnapshot();
	});

	it('should have DraftKings and Yahoo options', () => {
		// Arrange
		render(<Providers />);

		// Act
		const providerSelect =
			screen.getByTestId<HTMLSelectElement>('provider-select');

		// Assert
		expect(providerSelect.options[1].value).toBe(EProviders.DraftKings);
		expect(providerSelect.options[2].value).toBe(EProviders.Yahoo);
	});

	it('should set store provider on change', async () => {
		// Arrange
		const { store } = render(<Providers />);

		// Act
		const providerSelect =
			screen.getByTestId<HTMLSelectElement>('provider-select');

		await userEvent.selectOptions(providerSelect, [EProviders.DraftKings]);

		// Assert
		expect(store.getState().providers.provider).toBe(EProviders.DraftKings);
	});

	it('should reset sports, contests, and players if user has already visited site', async () => {
		// Arrange
		const { store } = render(<Providers />, {
			preloadedState: {
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

		// Act
		const providerSelect =
			screen.getByTestId<HTMLSelectElement>('provider-select');

		await userEvent.selectOptions(providerSelect, [EProviders.Yahoo]);

		// Assert
		const { contests, providers, sports } = store.getState();
		expect(providers.provider).toBe(EProviders.Yahoo);
		expect(contests.selectedContest).toBeNull();
		expect(sports.selectedSport).toBeNull();
	});
});
