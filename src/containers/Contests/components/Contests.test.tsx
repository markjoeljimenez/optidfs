import { render, screen, waitFor } from '@/test/render';
import { RootState } from 'src/store';
import { sportsMock } from '@/containers/Sports';
import { yahooContestsMock } from '../mocks/contests.mocks';
import Contests from './Contests';
import userEvent from '@testing-library/user-event';

const preloadedState: Partial<RootState> = {
	providers: {
		provider: 'yahoo',
	},
	sports: {
		selectedSport: sportsMock[0],
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
			id: 10632517,
			name: 'NBA $10 10-Team Group',
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
			yahooContestsMock.contests.length
		);
	});

	it('should display error message if selectedContest id is invalid', () => {
		// Arrange
		render(<Contests />, {
			preloadedState: {
				...preloadedState,
				contests: {
					selectedContest: {
						id: 12345,
						name: 'Invalid contest',
					},
					gameType: null,
				},
			},
		});
	});
});
