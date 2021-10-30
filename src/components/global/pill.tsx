import clsx from 'clsx';
import { Status } from '../../interfaces/IStatus';

interface Props {
	status: string;
	children: React.ReactNode;
}

const Pill = ({ status, children }: Props) => (
	<span
		className={clsx(
			'inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded-full',
			`text-${Status[status]}-100 bg-${Status[status]}-600`
		)}
	>
		{children}
	</span>
);

export default Pill;
