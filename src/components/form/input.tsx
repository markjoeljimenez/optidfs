import clsx from 'clsx';
import { ChangeEvent, CSSProperties, forwardRef } from 'react';

import { IDataAttributes } from '../../interfaces/IDataAttributes';
import { IError } from '../../interfaces/IError';

interface IInput {
	id: string;
	type: string;
	className?: string;
	data?: IDataAttributes;
	defaultValue?: number;
	error?: IError;
	hideLabel?: boolean;
	icon?: any;
	label?: string;
	max?: number;
	min?: number;
	onChange?(e: ChangeEvent<HTMLInputElement>): void;
	placeholder?: string;
	required?: boolean;
	step?: number;
	style?: CSSProperties;
	tippy?: any;
	value?: any;
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
			icon,
			id,
			label,
			max,
			min,
			onChange,
			placeholder,
			required,
			step,
			style,
			tippy,
			type,
			value,
		}: IInput,
		ref
	) => (
		<div>
			{/* <div className={clsx(tippy && 'pr-8')}>
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
			</div> */}

			<div className="flex items-center">
				{icon && <div className="h-5 w-5 mr-2">{icon}</div>}

				<input
					ref={ref}
					className={clsx(
						'focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md',
						error?.isError && 'border-red-500',
						!hideLabel && 'mt-2',
						className
					)}
					defaultValue={defaultValue}
					id={id}
					max={max}
					min={min}
					placeholder={placeholder}
					required={required}
					step={step}
					style={style}
					type={type}
					value={value}
					onChange={onChange}
					{...data}
				/>
			</div>

			{error?.isError && (
				<div className="mt-2 text-red-500">{error.message}</div>
			)}
		</div>
	)
);

export default Input;
