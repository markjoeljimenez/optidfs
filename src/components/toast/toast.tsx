import clsx from 'clsx';
import { ReactNode } from 'react';
import toast, { Toast as ToastProps } from 'react-hot-toast';

import toastTypes from './toast.types';

interface IToast {
	children: ReactNode;
}

type Props = IToast & Partial<ToastProps>;

const Toast = ({ children, id, type = 'blank', visible }: Props) => {
	const { classNames, icon } = toastTypes.get(type)!;

	function onClose() {
		toast.dismiss(id);
	}

	return (
		<div
			id={id}
			className={clsx(
				'flex p-4 mb-4 rounded-lg',
				classNames.container,
				visible ? 'animate-enter' : 'animate-leave'
			)}
			role="alert"
			data-toast-type={type}
		>
			<div className="flex-shrink-0 w-5 h-5">{icon}</div>
			<div className="mx-3 text-sm font-medium">{children}</div>
			{type === 'error' && (
				<button
					role="button"
					onClick={onClose}
					type="button"
					className={clsx(
						'ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5',
						classNames.closeButton
					)}
					data-dismiss-target={id}
					aria-label="Close"
				>
					<span className="sr-only">Close</span>
					<svg
						className="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clipRule="evenodd"
						></path>
					</svg>
				</button>
			)}
		</div>
	);
};

export default Toast;
