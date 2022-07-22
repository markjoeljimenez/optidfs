import clsx from 'clsx';
import toast, { useToaster } from 'react-hot-toast';

import notificationTypes from './notifications.types';

export const notificationTestId = 'notification';

const Notifications = () => {
	const { handlers, toasts } = useToaster({
		duration: 5000,
		error: {
			duration: Infinity,
		},
	});
	const { endPause, startPause } = handlers;

	return (
		<div
			style={{
				position: 'fixed',
				right: '1rem',
				top: '1rem',
			}}
			onMouseEnter={startPause}
			onMouseLeave={endPause}
		>
			{toasts
				.filter(({ visible }) => visible)
				.map(({ id, message, type, visible }) => {
					const { classNames, icon } = notificationTypes.get(type)!;

					return (
						<div
							key={id}
							className={clsx(
								'flex p-4 mb-4 rounded-lg',
								classNames.container,
								visible ? 'animate-enter' : 'animate-leave'
							)}
							data-testid={`${notificationTestId}-${id}`}
							data-toast-type={type}
							id={id}
							role="alert"
						>
							<div className="flex-shrink-0 w-5 h-5">{icon}</div>
							<div className="mx-3 text-sm font-medium">
								{message}
							</div>
							{type === 'error' && (
								<button
									aria-label="Close"
									className={clsx(
										'ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5',
										classNames.closeButton
									)}
									data-dismiss-target={id}
									role="button"
									type="button"
									onClick={() => toast.dismiss(id)}
								>
									<span className="sr-only">Close</span>
									<svg
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											clipRule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											fillRule="evenodd"
										></path>
									</svg>
								</button>
							)}
						</div>
					);
				})}
		</div>
	);
};

export default Notifications;
