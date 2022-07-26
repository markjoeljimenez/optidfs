import Alert from '../icons/alert';
import CheckmarkCircle from '../icons/checkmark-circle';
import Info from '../icons/info';

const toastTypes = new Map([
	[
		'error',
		{
			classNames: {
				closeButton:
					'bg-red-100 text-red-500 focus:ring-2 focus:ring-red-400 hover:bg-red-200',
				container:
					'bg-red-100 dark:bg-red-200 text-red-700 dark:text-red-800',
			},
			icon: <Alert />,
		},
	],
	[
		'blank',
		{
			classNames: {
				container: 'bg-blue-100',
				// 'bg-red-100 dark:bg-red-200 text-red-700 dark:text-red-800 ',
				// closeButton:
				// 	'bg-red-100 text-red-500 focus:ring-2 focus:ring-red-400 hover:bg-red-200',
			},
			icon: <Info />,
		},
	],
	[
		'success',
		{
			classNames: {
				container: 'bg-green-100',
				// 'bg-red-100 dark:bg-red-200 text-red-700 dark:text-red-800 ',
				// closeButton:
				// 	'bg-red-100 text-red-500 focus:ring-2 focus:ring-red-400 hover:bg-red-200',
			},
			icon: <CheckmarkCircle />,
		},
	],
]);

export default toastTypes;
