import userEvent from '@testing-library/user-event';
import { OptidfsApi } from 'src/api';
import { RootState } from 'src/store';

import RightNavigation from '@/components/global/right-navigation';
import { mapContests, yahooContestsMock } from '@/containers/Contests';
import { EProviders } from '@/containers/Players';
import { yahooSportsMock } from '@/containers/Sports';
import { render, screen, waitFor } from '@/test/render';

import { optimizedYahooLineups } from '../mocks/optimizedLineups.mocks';
import Optimize from './Optimize.component';

const preloadedState: Partial<RootState> = {
	contests: {
		gameType: null,
		selectedContest: mapContests(yahooContestsMock, 'yahoo')[0],
	},
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
	const getPlayers = OptidfsApi.endpoints.getPlayers.select({
		id: preloadedState.contests?.selectedContest?.contest_id!,
		provider: EProviders.Yahoo,
	});
	const getOptimizedLineups =
		OptidfsApi.endpoints.getOptimizedLineups.select('optimize');

	it('should match snapshot successfully', async () => {
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
		const view = render(app, { preloadedState });
		await waitFor(() =>
			expect(getPlayers(view.store.getState()).isSuccess).toBe(true)
		);

		// Act
		const optimizeButton = screen.getByTestId('optimize');
		await userEvent.click(optimizeButton);

		await waitFor(() =>
			expect(getOptimizedLineups(view.store.getState()).isSuccess).toBe(
				true
			)
		);

		const getOptimizedLineupsState = getOptimizedLineups(
			view.store.getState()
		);

		// Assert
		getOptimizedLineupsState.data?.forEach((lineup, i) => {
			expect(lineup.players).toStrictEqual(
				optimizedYahooLineups[i].players
			);
			expect(lineup.salary).toBe(optimizedYahooLineups[i].salary);
			expect(lineup.fppg).toBe(optimizedYahooLineups[i].fppg);
		});
	});
});
