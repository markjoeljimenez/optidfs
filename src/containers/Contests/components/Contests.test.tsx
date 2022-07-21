import { render, screen, waitFor } from '@/test/render';
import { RootState } from 'src/store';
import { draftKingsSportsMock } from '@/containers/Sports';
import { yahooContestsMock } from '../mocks/contests.mocks';
import Contests from './Contests';
import userEvent from '@testing-library/user-event';

const preloadedState: Partial<RootState> = {
	providers: {
		provider: 'yahoo',
	},
	sports: {
		selectedSport: draftKingsSportsMock[0],
	},
};

describe('Contests', () => {
	it('should match snapshot', () => {
		// Arrange
		const contests = render(<Contests />, { preloadedState });

		// Assert
		expect(contests).toMatchSnapshot();
	});

	it('should render options if provider and sport is selected', async () => {
		// Arrange
		render(<Contests />, { preloadedState });

		const contestsExpandButton = screen.getByRole('button');

		// Act
		userEvent.click(contestsExpandButton);

		// Assert
		const contestsList = await screen.findByRole('listbox');
		expect(contestsList).toBeInTheDocument();
	});

	it('should set selected contest on contest click', async () => {
		// Arrange
		const { store } = render(<Contests />, { preloadedState });

		const contestsExpandButton = screen.getByRole('button');

		// Act
		await userEvent.click(contestsExpandButton);

		// Get first contest and click
		const firstContest = await waitFor(
			() => screen.getAllByRole('option')[0]
		);
		await userEvent.click(firstContest);

		// Assert
		expect(store.getState().contests.selectedContest).toStrictEqual({
			contest_id: 11109513,
			name: 'PGA $20K Thursday Baller [$4K to 1st]',
		});
	});

	it('should narrow results if searching', async () => {
		// Arrange
		render(<Contests />, { preloadedState });

		const contestsSearchInput = screen.getByPlaceholderText(
			'Search contest by ID or name'
		);

		// Act
		await userEvent.type(contestsSearchInput, 'NBA $10 10-Team Group', {
			delay: 10,
		});

		// Wait for list appear
		const contestsList = screen.getByRole('listbox');

		// Assert
		expect(contestsList.children.length).toBeLessThan(
			yahooContestsMock.length
		);
	});

	it('should display error message if selectedContest id is invalid', () => {
		// Arrange
		render(<Contests />, {
			preloadedState: {
				...preloadedState,
				contests: {
					selectedContest: {
						contest_id: 12345,
						name: 'Invalid contest',
					},
					gameType: null,
				},
			},
		});
	});
});
