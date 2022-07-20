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
	disabled?: boolean;
	error?: IError;
	hideLabel?: boolean;
	id: string;
	label?: string;
	options: string[] | IValueLabel[];
	placeholder?: string;
	position?: 'prepend' | 'append';
	required?: boolean;
	tippy?: any;
	value?: string;
	testId?: string;

	onChange?(e: ChangeEvent<HTMLSelectElement>): void;
}

// eslint-disable-next-line react/display-name
const Select = forwardRef<HTMLSelectElement, ISelect>(
	({ children, ...props }: ISelect, ref) => {
		return (
			<div className={props.className}>
				<div
					className={clsx(
						props.error && 'text-red-700',
						props.tippy && 'pr-8'
					)}
				>
					<label
						className={clsx(
							'block text-sm font-medium text-gray-700',
							props.hideLabel && 'sr-only'
						)}
						htmlFor={props.id}
					>
						{props.label}
					</label>
					{props.tippy}
				</div>

				<div className={clsx('flex', !props.hideLabel && 'mt-2')}>
					{props.position === 'prepend' && children}

					<select
						ref={ref}
						className={clsx(
							'focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded cursor-pointer',
							props.position === 'append' &&
								'rounded-tr-none rounded-br-none',
							props.position === 'prepend' &&
								'rounded-tl-none rounded-bl-none',
							props.error?.isError && 'border-red-700'
						)}
						data-testid={props.testId}
						defaultValue={
							props.defaultValue !== undefined
								? props.defaultValue
								: undefined
						}
						disabled={props.disabled}
						id={props.id}
						value={
							props.value !== undefined ? props.value : undefined
						}
						onChange={props.onChange}
					>
						<option disabled value="">
							{props.placeholder}
						</option>

						{props.options?.map((item, i) => (
							<option
								key={`${item.label}`}
								data-testid={`${item.label}`.toLocaleLowerCase()}
								value={item.value || item}
							>
								{item.label}
							</option>
						))}
					</select>

					{props.position === 'append' && children}
				</div>

				{props.error?.isError && (
					<div className="mt-2 text-red-500">
						{props.error.message}
					</div>
				)}
			</div>
		);
	}
);

export default Select;
