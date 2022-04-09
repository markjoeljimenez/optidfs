import React from 'react';
import { render, screen } from '@/test/render';
import Loading, { LoadingSize, sizeMap, testId } from './loading';

describe('loading', () => {
	it('should match screenshot', () => {
		// Arrange
		const loading = render(<Loading />);

		// Assert
		expect(loading).toMatchSnapshot();
	});

	it('should contain text', () => {
		// Arrange
		const text = 'Loading...';
		render(<Loading text={text} />);

		// Act
		const loading = screen.getByTestId(testId);

		// Assert
		expect(loading).toHaveTextContent(text);
	});

	it('should render large size', () => {
		// Arrange
		render(<Loading size={LoadingSize.Large} />);

		// Act
		const loading = screen.getByTestId(testId);
		const svg = loading.querySelector('svg');

		// Assert
		expect(svg).toHaveClass(sizeMap.get(LoadingSize.Large)!);
	});
});
