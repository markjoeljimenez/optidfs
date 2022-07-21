import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@/test/render';
import Sports from './Sports';
import { RootState } from 'src/store';

const preloadedState: Partial<RootState> = {
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

	describe('Draftkings mocks', () => {
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
			expect(sportsSelect.options[1].value).toBe('2');
			expect(sportsSelect.options[2].value).toBe('13');
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
			await userEvent.selectOptions(sportsSelect, ['2']);

			// Assert
			expect(store.getState().sports.selectedSport?.sportId).toBe(2);
		});
	});

	describe('Yahoo mocks', () => {
		it('should render sports options if provider is selected', async () => {
			// Arrange
			render(<Sports />, {
				preloadedState: {
					providers: {
						provider: 'yahoo',
					},
				},
			});

			const sportsSelect = screen.getByTestId(
				'sports-select'
			) as HTMLSelectElement;

			await waitFor(() =>
				expect(sportsSelect.hasAttribute('disabled')).toBe(false)
			);

			// Assert
			expect(sportsSelect.options[1].value).toBe('golf');
			expect(sportsSelect.options[2].value).toBe('mlb');
		});

		it('should set selectedSport on change', async () => {
			// Arrange
			const { store } = render(<Sports />, {
				preloadedState: {
					providers: {
						provider: 'yahoo',
					},
				},
			});

			const sportsSelect = screen.getByTestId(
				'sports-select'
			) as HTMLSelectElement;

			await waitFor(() =>
				expect(sportsSelect.hasAttribute('disabled')).toBe(false)
			);

			// Act
			await userEvent.selectOptions(sportsSelect, ['golf']);

			// Assert
			expect(store.getState().sports.selectedSport?.sportId).toBe('golf');
		});
	});
});
