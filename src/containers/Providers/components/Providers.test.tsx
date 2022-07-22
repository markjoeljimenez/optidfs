import userEvent from '@testing-library/user-event';

import { draftKingsContestsMock } from '@/containers/Contests';
import { draftKingsPlayersMock } from '@/containers/Players';
import { draftKingsSportsMock } from '@/containers/Sports';
import { render, screen } from '@/test/render';

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
		const providerSelect = screen.getByTestId(
			'provider-select'
		) as HTMLSelectElement;

		// Assert
		expect(providerSelect.options[1].value).toBe('draftkings');
		expect(providerSelect.options[2].value).toBe('yahoo');
	});

	it('should set store provider on change', async () => {
		// Arrange
		const { store } = render(<Providers />);

		// Act
		const providerSelect = screen.getByTestId(
			'provider-select'
		) as HTMLSelectElement;

		await userEvent.selectOptions(providerSelect, ['draftkings']);

		// Assert
		expect(store.getState().providers.provider).toBe('draftkings');
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
				players: {
					defaultPlayers: draftKingsPlayersMock,
				},
				sports: {
					selectedSport: draftKingsSportsMock[0],
				},
			},
		});

		// Act
		const providerSelect = screen.getByTestId(
			'provider-select'
		) as HTMLSelectElement;

		await userEvent.selectOptions(providerSelect, ['yahoo']);

		// Assert
		const { contests, players, providers, sports } = store.getState();
		expect(providers.provider).toBe('yahoo');
		expect(contests.selectedContest).toBeNull();
		expect(players.defaultPlayers).toBeNull();
		expect(sports.selectedSport).toBeNull();
	});
});
