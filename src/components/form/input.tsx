import clsx from 'clsx';
import { ChangeEvent, forwardRef } from 'react';

interface IInput {
	className?: string;
	defaultValue?: number;
	error?: string | boolean;
	id: string;
	label?: string;
	max?: number;
	min?: number;
	placeholder?: string;
	required?: boolean;
	step?: number;
	tippy?: any;
	type: string;
	hideLabel?: boolean;

	onChange?(e: ChangeEvent<HTMLInputElement>): void;
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, IInput>(
	(
		{
			className,
			defaultValue,
			error,
			hideLabel,
			id,
			label,
			max,
			min,
			placeholder,
			step,
			tippy,
			type,
			onChange,
		}: IInput,
		ref
	) => (
		<div className={className}>
			<div className={clsx(error && 'text-red-700', tippy && 'pr-8')}>
				<label
					htmlFor={id}
					className={clsx(
						'block text-sm font-medium text-gray-700',
						hideLabel && 'sr-only'
					)}
				>
					{label}
					{tippy}
				</label>
			</div>

			<input
				className={clsx(
					'focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md',
					!hideLabel && 'mt-2'
				)}
				defaultValue={defaultValue}
				id={id}
				max={max}
				min={min}
				onChange={onChange}
				placeholder={placeholder}
				ref={ref}
				required
				step={step}
				type={type}
			/>
		</div>
	)
);

export default Input;
