import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { mockNextUseRouter } from '../../scripts/testing/util/mockNextUseRouter';
import { render, screen, waitFor } from '../../scripts/testing/render';
import userEvent from '@testing-library/user-event';
import Index from '../index';

const server = setupServer(
	rest.get('http://127.0.0.1:5000', (req, res, ctx) => {
		return res(
			ctx.json([
				{
					fullName: 'Football',
					hasPublicContests: true,
					isEnabled: true,
					positions: [
						'QB',
						'RB',
						'RB',
						'WR',
						'WR',
						'WR',
						'TE',
						'FLEX',
						'DST',
					],
					regionAbbreviatedSportName: 'NFL',
					regionFullSportName: 'Football',
					sortOrder: 1,
					sportId: 1,
					supported: true,
				},
				{
					fullName: 'Basketball',
					hasPublicContests: true,
					isEnabled: true,
					positions: ['PG', 'SG', 'SF', 'PF', 'C', 'G', 'F', 'UTIL'],
					regionAbbreviatedSportName: 'NBA',
					regionFullSportName: 'Basketball',
					sortOrder: 2,
					sportId: 4,
					supported: true,
				},
			])
		);
	})
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Index', () => {
	mockNextUseRouter({
		route: '/',
		pathname: '/',
		query: '',
		asPath: ``,
	});

	it('renders index page successfully', () => {
		const dashboard = render(<Index />);

		expect(dashboard).toMatchSnapshot();
	});

	it('should proceed to step 2 if provider and sport is selected', async () => {
		render(<Index />);

		const providerSelect = screen.getByTestId(
			'provider-select'
		) as HTMLSelectElement;
		const sportSelect = screen.getByTestId(
			'sports-select'
		) as HTMLSelectElement;
		const nextButton = screen.getByTestId(
			'to-next-step'
		) as HTMLButtonElement;

		expect(sportSelect.hasAttribute('disabled')).toBe(true);
		expect(nextButton.hasAttribute('disabled')).toBe(true);

		// Select provider
		userEvent.selectOptions(providerSelect, ['yahoo']);

		await waitFor(() =>
			expect(sportSelect.hasAttribute('disabled')).toBe(false)
		);

		expect(nextButton.hasAttribute('disabled')).toBe(true);

		// Select sport
		userEvent.selectOptions(sportSelect, ['4']);

		await waitFor(() =>
			expect(nextButton.hasAttribute('disabled')).toBe(false)
		);

		// Click button to proceed to step 2
		userEvent.click(nextButton);

		expect(providerSelect).not.toBeInTheDocument();
		expect(sportSelect).not.toBeInTheDocument();
		expect(nextButton).not.toBeInTheDocument();
	});
});
