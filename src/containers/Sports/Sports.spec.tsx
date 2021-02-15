import { render, screen } from '../../scripts/testing/render';
import { ISports } from '../../interfaces/ISports';

import Sports from './Sports.component';

interface IDefaultState {
	sports: {
		sports: ISports[];
	};
}

const initialState: IDefaultState = {
	sports: {
		sports: [
			{
				fullName: 'NBA',
				regionAbbreviatedSportName: 'NBA',
				hasPublicContests: true,
				isEnabled: true,
				supported: true,
				sportId: 4,
			},
			{
				fullName: 'NFL',
				regionAbbreviatedSportName: 'NFL',
				hasPublicContests: true,
				isEnabled: true,
				supported: true,
				sportId: 1,
			},
			{
				fullName: 'Nascar',
				regionAbbreviatedSportName: 'NAS',
				hasPublicContests: true,
				isEnabled: false,
				supported: true,
				sportId: 10,
			},
		],
	},
};

describe('Sports dropdown', () => {
	test('render without crashing', () => {
		render(<Sports />, {
			initialState,
		});
	});

	test('contains sports', () => {
		render(<Sports />, {
			initialState,
		});

		const options = screen
			.getAllByRole('option')
			.filter((option) => !option.hasAttribute('disabled'));

		expect(options.length).toBeGreaterThan(0);
	});

	test('filters hasPublicContests, isEnabled, and supported sports', () => {
		render(<Sports />, {
			initialState,
		});

		const filteredSports = initialState.sports.sports.filter(
			(sport) =>
				sport.hasPublicContests && sport.isEnabled && sport.supported
		);

		const options = screen
			.getAllByRole('option')
			.filter((option) => !option.hasAttribute('disabled'));

		options.forEach((option, i) => {
			expect(option.innerHTML).toBe(
				filteredSports[i].regionAbbreviatedSportName
			);
		});
	});
});
