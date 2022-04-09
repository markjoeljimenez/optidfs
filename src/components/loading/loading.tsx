import clsx from 'clsx';

export enum LoadingSize {
	Default = 'default',
	Large = 'large',
}

export const sizeMap = new Map<LoadingSize, string>([
	[LoadingSize.Default, 'h-6 w-6'],
	[LoadingSize.Large, 'h-14 w-14'],
]);

interface ILoading {
	colour?: string;
	size?: LoadingSize;
	text?: string;
}

const Loading = ({ colour, size, text }: ILoading) => (
	<div className="flex items-center justify-center" data-testid={testId}>
		<svg
			className={clsx(
				'animate-spin -ml-1 mr-3',
				sizeMap.get(size ?? LoadingSize.Default),
				colour ? `text-${colour}-600` : ''
			)}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"
			></circle>
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			></path>
		</svg>
		{text && <span>{text}</span>}
	</div>
);

export const testId = 'loading';

export default Loading;
