import userEvent from '@testing-library/user-event';
import { RootState } from 'src/store';

import RightNavigation from '@/components/global/right-navigation';
import { mapContests, yahooContestsMock } from '@/containers/Contests';
import { GetPlayersExtendedApi, IPlayer } from '@/containers/Players';
import { EProviders } from '@/containers/Providers';
import { yahooSportsMock } from '@/containers/Sports';
import { render, screen, waitFor } from '@/test/render';

import { GetOptimizedLineupsExtendedApi } from '../api';
import { GetOptimizedLineupsPostBodyMock } from '../mocks';
import { Optimize } from './Optimize.component';

const preloadedState: Partial<RootState> = {
	contests: {
		gameType: null,
		selectedContest: mapContests(yahooContestsMock, 'yahoo')[0],
	},
	optimize: GetOptimizedLineupsPostBodyMock,
	providers: {
		provider: EProviders.Yahoo,
	},
	sports: {
		selectedSport: yahooSportsMock[0],
	},
};

const app = (
	<>
		<Optimize />
		<RightNavigation />
	</>
);

jest.mock('flagsmith/react', () => ({
	useFlags: jest.fn().mockReturnValue({
		stacking: {
			enabled: true,
			value: null,
		},
	}),
}));

describe('Optimize', () => {
	const getPlayers = GetPlayersExtendedApi.endpoints.getPlayers.select({
		id: preloadedState.contests?.selectedContest?.contest_id!,
		provider: EProviders.Yahoo,
	});
	const getOptimizedLineups =
		GetOptimizedLineupsExtendedApi.endpoints.getOptimizedLineups.select(
			'optimize'
		);

	it('should match snapshot', async () => {
		// Arrange
		const view = render(app, { preloadedState });
		await waitFor(() =>
			expect(getPlayers(view.store.getState()).isSuccess).toBe(true)
		);

		// Assert
		expect(view).toMatchSnapshot();
	});

	it('should get optimized lineups successfully', async () => {
		// Arrange
		const { store } = render(app, { preloadedState });
		await waitFor(() =>
			expect(getPlayers(store.getState()).isSuccess).toBe(true)
		);

		// Act
		const optimizeButton = screen.getByTestId('optimize');
		await userEvent.click(optimizeButton);

		await waitFor(() =>
			expect(getOptimizedLineups(store.getState()).isSuccess).toBe(true)
		);

		const getOptimizedLineupsState = getOptimizedLineups(store.getState());

		// Assert
		expect(getOptimizedLineupsState.data?.lineups.length).toBe(1);
	});

	it('should get number of generated lineups if set', async () => {
		// Arrange
		const { store } = render(app, { preloadedState });
		await waitFor(() =>
			expect(getPlayers(store.getState()).isSuccess).toBe(true)
		);

		// Act
		const settingsButtons = screen.getAllByRole('button');
		await userEvent.click(settingsButtons[1]);

		const numberOfGenerationsInput = screen.getByTestId(
			'number-of-generations'
		);
		await userEvent.type(numberOfGenerationsInput, '{Backspace}{5}');

		const optimizeButton = screen.getByTestId('optimize');
		await userEvent.click(optimizeButton);

		await waitFor(() =>
			expect(getOptimizedLineups(store.getState()).isSuccess).toBe(true)
		);

		const getOptimizedLineupsState = getOptimizedLineups(store.getState());

		// Assert
		expect(getOptimizedLineupsState.data?.lineups.length).toBe(5);
	});

	it('should filter players if set', async () => {
		// Arrange
		const { store } = render(app, { preloadedState });
		await waitFor(() =>
			expect(getPlayers(store.getState()).isSuccess).toBe(true)
		);

		// Act
		const settingsButtons = screen.getAllByRole('button');
		await userEvent.click(settingsButtons[1]);

		const filterCheckboxes = screen.getAllByRole('checkbox');
		await userEvent.click(filterCheckboxes[1]); // Check Active
		await userEvent.click(filterCheckboxes[2]); // Check IL10

		const optimizeButton = screen.getByTestId('optimize');
		await userEvent.click(optimizeButton);

		await waitFor(() =>
			expect(getOptimizedLineups(store.getState()).isSuccess).toBe(true)
		);

		const getOptimizedLineupsState = getOptimizedLineups(store.getState());

		// Assert
		expect(
			getOptimizedLineupsState.data!.lineups[0].players.every(
				(player: IPlayer) =>
					player.status === 'N/A' || player.status === 'IL10'
			)
		).toBe(true);
	});
});
