import userEvent from '@testing-library/user-event';
import { logRoles, render, screen, waitFor } from '@/test/render';
import Sports from '../Sports';

const preloadedState = {
	providers: {
		provider: 'draftkings',
	},
};

describe('Sports', () => {
	it('should match snapshot', () => {
		// Arrange
		const sports = render(<Sports />);

		// Assert
		expect(sports).toMatchSnapshot();
	});

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
		expect(sportsSelect.options[1].value).toBe('4');
		expect(sportsSelect.options[2].value).toBe('1');
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
		userEvent.selectOptions(sportsSelect, ['4']);

		// Assert
		expect(store.getState().sports.selectedSport?.sportId).toBe(4);
	});
});
