import { ISports } from '../../interfaces/ISports';
import { render, fireEvent, screen } from '../../scripts/testing/render';
import Sports from './Sports';

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
				sportId: 1,
			},
			{
				fullName: 'NFL',
				regionAbbreviatedSportName: 'NFL',
				hasPublicContests: true,
				isEnabled: true,
				supported: true,
				sportId: 2,
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

	test('have sports', () => {
		render(<Sports />, {
			initialState,
		});

		const options = screen
			.getAllByRole('option')
			.filter((option) => !option.hasAttribute('disabled'));

		expect(options.length).toBeGreaterThan(0);
	});
});
