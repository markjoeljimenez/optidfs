import userEvent from '@testing-library/user-event';
import { OptidfsApi } from 'src/api';
import { RootState } from 'src/store';

import { yahooContestsMock } from '@/containers/Contests';
import { mapContests } from '@/containers/Contests/services/mapContests';
import { yahooSportsMock } from '@/containers/Sports';
import { render, screen, waitFor } from '@/test/render';

import Table from './Table.component';

const preloadedState: Partial<RootState> = {
	contests: {
		gameType: null,
		selectedContest: mapContests(yahooContestsMock, 'yahoo')[0],
	},
	providers: {
		provider: 'yahoo',
	},
	sports: {
		selectedSport: yahooSportsMock[0],
	},
};

const app = <Table />;

jest.mock('flagsmith/react', () => ({
	useFlags: jest.fn().mockReturnValue({
		stacking: {
			enabled: true,
			value: null,
		},
	}),
}));

describe('Table', () => {
	const getPlayers = OptidfsApi.endpoints.getPlayers.select({
		id: preloadedState.contests?.selectedContest?.contest_id!,
		provider: 'yahoo',
	});

	it('should match snapshot', async () => {
		// Arrange
		const view = render(app, { preloadedState });
		await waitFor(() =>
			expect(getPlayers(view.store.getState()).isSuccess).toBe(true)
		);

		// Assert
		expect(view).toMatchSnapshot();
	});

	it('should filter status', async () => {
		// Arrange
		const view = render(app, { preloadedState });
		await waitFor(() =>
			expect(getPlayers(view.store.getState()).isSuccess).toBe(true)
		);

		// Act
		// Click filter button
		const filterButton = screen.getByTestId('table-filter');
		await userEvent.click(filterButton);

		// Get filter menu items
		const options = screen.getAllByRole('menuitem');
		expect(options.length).toBe(3);

		// Click DTD option
		await userEvent.click(options[2]);

		// Assert
		const rows = screen.getAllByTestId('table-row');
		expect(rows.length).toBe(1);
	});

	it('should sort salary', async () => {
		// Arrange
		const view = render(app, { preloadedState });
		await waitFor(() =>
			expect(getPlayers(view.store.getState()).isSuccess).toBe(true)
		);

		// Act
		// Click sort button
		const sortButton = screen.getByTestId('table-sort-salary');
		await userEvent.click(sortButton);

		// Assert
		const salaryCells = screen.getAllByTestId('table-cell-salary');
		const firstNameCells = screen.getAllByTestId('table-cell-firstName');
		const lastNameCells = screen.getAllByTestId('table-cell-lastName');

		const name = `${firstNameCells[0].textContent} ${lastNameCells[0].textContent}`;

		expect(name).toBe('Alex Cobb');
		expect(salaryCells[0].textContent).toBe('$28');
	});

	it('should sort fppg', async () => {
		// Arrange
		const view = render(app, { preloadedState });
		await waitFor(() =>
			expect(getPlayers(view.store.getState()).isSuccess).toBe(true)
		);

		// Act
		// Click sort button
		const sortButton = screen.getByTestId('table-sort-fppg');
		await userEvent.click(sortButton);

		// Assert
		const fppgCells = screen.getAllByTestId('table-cell-fppg');
		const firstNameCells = screen.getAllByTestId('table-cell-firstName');
		const lastNameCells = screen.getAllByTestId('table-cell-lastName');

		const name = `${firstNameCells[0].textContent} ${lastNameCells[0].textContent}`;

		expect(name).toBe('Brandon Belt');
		expect(fppgCells[0].textContent).toBe('99');
	});

	it('should search successfully', async () => {
		// Arrange
		const view = render(app, { preloadedState });
		await waitFor(() =>
			expect(getPlayers(view.store.getState()).isSuccess).toBe(true)
		);

		// Act
		const searchInput = screen.getByTestId('table-search');
		await userEvent.type(searchInput, 'Brandon', {
			delay: 10,
		});

		// Assert
		const rows = screen.getAllByTestId('table-row');
		expect(rows.length).toBe(1);
	});
});
