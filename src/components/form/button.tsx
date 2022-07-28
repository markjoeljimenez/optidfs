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
			'px-4 py-2 bg-indigo-500 text-white rounded shadow font-black hover:bg-indigo-600',
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
