import clsx from 'clsx';

interface IButton {
	children: any;
	onClick(e: React.MouseEvent<HTMLButtonElement>): void;
	className?: string;
	disabled?: boolean;
	testId?: string;
}

const Button = ({
	children,
	className,
	disabled,
	onClick,
	testId,
}: IButton) => (
	<button
		className={clsx(
			'inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
			className
		)}
		data-testid={testId}
		disabled={disabled}
		type="button"
		onClick={onClick}
	>
		{children}
	</button>
);

export default Button;
