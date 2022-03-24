import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, logRoles } from '@/test/render';
import Contests from '../Contests';
import { RootState } from 'src/store';
import { sportsMock } from '@/containers/Sports';

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
		userEvent.click(contestsExpandButton);

		// Wait for list appear
		await screen.findByRole('listbox');

		// Get first contest and click
		const firstContest = screen.getAllByRole('option')[0];
		userEvent.click(firstContest);

		// Assert
		expect(store.getState().contests.selectedContest).toStrictEqual({
			id: 10632517,
			name: 'NBA $10 10-Team Group',
		});
	});
});
