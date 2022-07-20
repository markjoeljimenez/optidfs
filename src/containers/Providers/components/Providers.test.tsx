import userEvent from '@testing-library/user-event';
import { render, screen } from '@/test/render';
import Providers from './Providers';

describe('Providers', () => {
	it('should match snapshot', () => {
		const provider = render(<Providers />);

		expect(provider).toMatchSnapshot();
	});

	it('should have DraftKings and Yahoo options', () => {
		render(<Providers />);

		const providerSelect = screen.getByTestId(
			'provider-select'
		) as HTMLSelectElement;

		expect(providerSelect.options[1].value).toBe('draftkings');
		expect(providerSelect.options[2].value).toBe('yahoo');
	});

	it('should set store provider on change', async () => {
		const { store } = render(<Providers />);

		const providerSelect = screen.getByTestId(
			'provider-select'
		) as HTMLSelectElement;

		await userEvent.selectOptions(providerSelect, ['draftkings']);

		expect(store.getState().providers.provider).toBe('draftkings');
	});
});
