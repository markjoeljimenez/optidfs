import clsx from 'clsx';

interface IButton {
	className?: string;
	children: any;

	onClick(e: React.MouseEvent<HTMLButtonElement>): void;
}

const Button = ({ className, children, onClick }: IButton) => (
	<button
		className={clsx(
			'px-4 py-2 bg-indigo-700 text-white rounded shadow font-black hover:bg-indigo-800',
			className
		)}
		onClick={onClick}
	>
		{children}
	</button>
);

export default Button;
