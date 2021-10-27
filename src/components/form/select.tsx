import clsx from 'clsx';
import {
	ChangeEvent,
	forwardRef,
	MouseEvent,
	ReactNode,
	useEffect,
	useState,
} from 'react';
import { IError } from '../../interfaces/IError';

export interface IValueLabel {
	value: string | number;
	label: string;
}

interface ISelect {
	children?: ReactNode;
	className?: string;
	defaultValue?: string;
	error?: IError;
	hideLabel?: boolean;
	id: string;
	options: string[] | IValueLabel[];
	label?: string;
	placeholder?: string;
	position?: 'prepend' | 'append';
	required?: boolean;
	tippy?: any;
	value?: string;

	onChange?(e: ChangeEvent<HTMLSelectElement>): void;
}

// eslint-disable-next-line react/display-name
const Select = forwardRef<HTMLSelectElement, ISelect>(
	(
		{
			children,
			className,
			defaultValue,
			error,
			hideLabel,
			id,
			options,
			label,
			placeholder,
			position,
			tippy,
			value,
			onChange,
		}: ISelect,
		ref
	) => {
		return (
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
					</label>
					{tippy}
				</div>

				<div className={clsx('flex', !hideLabel && 'mt-2')}>
					{position === 'prepend' && children}

					<select
						defaultValue={defaultValue || undefined}
						value={value || undefined}
						className={clsx(
							'focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded cursor-pointer',
							position === 'append' &&
								'rounded-tr-none rounded-br-none',
							position === 'prepend' &&
								'rounded-tl-none rounded-bl-none',
							error?.isError && 'border-red-700'
						)}
						ref={ref}
						id={id}
						onChange={onChange}
					>
						<option value="" disabled>
							{placeholder}
						</option>

						{options?.map((item, i) => (
							<option value={item.value || item} key={i}>
								{item.label || item}
							</option>
						))}
					</select>

					{position === 'append' && children}
				</div>

				{error?.isError && (
					<div className="mt-2 text-red-500">{error.message}</div>
				)}
			</div>
		);
	}
);

export default Select;
