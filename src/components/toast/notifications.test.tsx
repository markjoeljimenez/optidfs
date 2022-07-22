import userEvent from '@testing-library/user-event';
import toast from 'react-hot-toast';

import { act, render, screen } from '@/test/render';

import Notifications, { notificationTestId } from './notifications';

describe('Notification', () => {
	const notificationOptions = {
		id: '1',
	};

	it('should display notification error', () => {
		// Arrange
		const view = render(<Notifications />);

		act(() => {
			toast.error('Error!', notificationOptions);
		});

		// Assert
		expect(view).toMatchSnapshot();
	});

	it('should display notification info', () => {
		// Arrange
		render(<Notifications />);

		// Act
		act(() => {
			toast.error('Error!', notificationOptions);
		});

		const notification = screen.getByTestId(
			`${notificationTestId}-${notificationOptions.id}`
		);

		// Assert
		expect(notification).toBeInTheDocument();
	});

	it('should remove notification on close button click', async () => {
		// Arrange
		render(<Notifications />);

		// Act
		act(() => {
			toast.error('Error!', notificationOptions);
		});

		const notification = screen.getByTestId(
			`${notificationTestId}-${notificationOptions.id}`
		);

		const toastCloseButton = screen.getByRole('button');
		await userEvent.click(toastCloseButton);

		// Assert
		// Need to set timeout because it takes .25 of a second for the toast to be removed from the DOM
		setTimeout(() => {
			expect(notification).not.toBeInTheDocument();
		}, 500);
	});
});
