import clsx from 'clsx';
import { ChangeEvent } from 'react';

interface IInput {
	className?: string;
	error?: string | boolean;
	id: string;
	label: string;
	max?: number;
	min?: number;
	placeholder?: string;
	required?: boolean;
	step?: number;
	tippy?: any;
	type: string;

	onChange(e: ChangeEvent<HTMLInputElement>): void;
}

const Input = ({
	className,
	error,
	id,
	label,
	max,
	min,
	placeholder,
	step,
	tippy,
	type,
	onChange,
}: IInput) => (
	<div className={className}>
		<div className={clsx(error && 'text-red-700', tippy && 'pr-8')}>
			<label
				htmlFor={id}
				className="block text-sm font-medium text-gray-700"
			>
				{label}
			</label>
			{tippy}
		</div>

		<input
			className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mt-2"
			id={id}
			max={max}
			min={min}
			onChange={onChange}
			placeholder={placeholder}
			required
			type={type}
			step={step}
		/>
	</div>
);

export default Input;
