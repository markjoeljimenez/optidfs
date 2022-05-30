import { render } from '@/test/render';
import userEvent from '@testing-library/user-event';
import Toast from './toast';

describe('Toast', () => {
	const _toast = {
		id: '1',
		visible: true,
		type: 'error',
	} as any;

	it('should display toast error', () => {
		// Arrange
		const toast = render(<Toast {..._toast}>Test toast</Toast>);

		// Assert
		expect(toast).toMatchSnapshot();
	});

	it('should display toast info', () => {
		// Arrange
		const toast = render(
			<Toast
				{...{
					..._toast,
					type: 'blank',
				}}
			>
				Test toast
			</Toast>
		);

		// Assert
		expect(
			toast.container.firstElementChild?.getAttribute('data-toast-type')
		).toBe('blank');
	});

	it('should remove toast error on close button click', () => {
		// Arrange
		const toast = render(<Toast {..._toast}>Test toast</Toast>);

		// Act
		const toastCloseButton = toast.getByRole('button');
		userEvent.click(toastCloseButton);

		// Assert
		// Need to set timeout because it takes .25 of a second for the toast to be removed from the DOM
		setTimeout(() => {
			expect(toast.container.firstChild).not.toBeInTheDocument();
		}, 500);
	});
});
