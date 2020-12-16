import clsx from 'clsx';
import { ReactNode } from 'react';

interface IInputGroup {
	label: string;
	children: ReactNode;
	tippy?: any;
	error?: {
		message: string;
	};
}

const InputGroup = ({ label, error, tippy, children }: IInputGroup) => (
	<div className="relative pt-6 flex items-baseline">
		<p
			className={clsx(
				'text-xs uppercase font-black absolute top-0 left-0 whitespace-no-wrap',
				error && 'text-red-700',
				tippy && 'pr-8'
			)}
		>
			{label} {tippy}
		</p>

		{children}
	</div>
);

export default InputGroup;
