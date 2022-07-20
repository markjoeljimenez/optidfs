import clsx from 'clsx';
import { ChangeEvent, forwardRef } from 'react';

import { IDataAttributes } from '../../interfaces/IDataAttributes';
import { IError } from '../../interfaces/IError';

interface IInput {
	className?: string;
	defaultValue?: number;
	error?: IError;
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
	value?: any;
	data?: IDataAttributes;

	onChange?(e: ChangeEvent<HTMLInputElement>): void;
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, IInput>(
	(
		{
			className,
			data,
			defaultValue,
			error,
			hideLabel,
			id,
			label,
			max,
			min,
			onChange,
			placeholder,
			step,
			tippy,
			type,
			value,
		}: IInput,
		ref
	) => (
		<div className={className}>
			<div className={clsx(tippy && 'pr-8')}>
				<label
					className={clsx(
						'block text-sm font-medium text-gray-700',
						hideLabel && 'sr-only'
					)}
					htmlFor={id}
				>
					{label}
					{tippy}
				</label>
			</div>

			<input
				ref={ref}
				required
				className={clsx(
					'focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md',
					error?.isError && 'border-red-500',
					!hideLabel && 'mt-2'
				)}
				defaultValue={defaultValue}
				id={id}
				max={max}
				min={min}
				placeholder={placeholder}
				step={step}
				type={type}
				value={value}
				onChange={onChange}
				{...data}
			/>

			{error?.isError && (
				<div className="mt-2 text-red-500">{error.message}</div>
			)}
		</div>
	)
);

export default Input;
