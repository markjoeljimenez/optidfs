import clsx from 'clsx';

interface Props {
	status: string;
	children: React.ReactNode;
}

const Pill = ({ status, children }: Props) => (
	<span
		className={clsx(
			'inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded-full',
			`text-${status}-100 bg-${status}-600`
		)}
	>
		{children}
	</span>
);

export default Pill;
