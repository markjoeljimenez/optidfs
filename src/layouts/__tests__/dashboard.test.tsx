import '@testing-library/jest-dom';
import { render, screen } from '../../scripts/testing/render';
import { mockNextUseRouter } from '../../scripts/testing/util/mockNextUseRouter';
import Dashboard from '../dashboard';

describe('Dashboard', () => {
	mockNextUseRouter({
		route: '/',
		pathname: '/test',
		query: '',
		asPath: ``,
	});

	it('renders dashboard successfully', () => {
		const dashboard = render(<Dashboard>{'test'}</Dashboard>);

		const nav = screen.getByTestId('nav');
		const header = screen.getByTestId('header');
		const mainContent = screen.getByTestId('main-content');

		expect(header).toBeInTheDocument();
		expect(nav).toBeInTheDocument();
		expect(mainContent).toHaveTextContent('test');
		expect(dashboard).toMatchSnapshot();
	});
});
