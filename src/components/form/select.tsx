import clsx from 'clsx';
import { ChangeEvent, forwardRef, ReactNode } from 'react';

interface ISelect {
	children?: ReactNode;
	className?: string;
	error?: string | boolean;
	hideLabel?: boolean;
	id: string;
	items: any[];
	label: string;
	placeholder?: string;
	position?: 'prepend' | 'append';
	required?: boolean;
	tippy?: any;

	onChange?(e: ChangeEvent<HTMLSelectElement>): void;
}

// eslint-disable-next-line react/display-name
const Select = forwardRef<HTMLSelectElement, ISelect>(
	(
		{
			children,
			className,
			error,
			hideLabel,
			id,
			items,
			label,
			placeholder,
			position,
			tippy,
			onChange,
		}: ISelect,
		ref
	) => {
		return (
			<div>
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

				<div className="flex mt-2">
					{position === 'prepend' && children}

					<select
						className={clsx(
							'focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded',
							position === 'append' &&
								'rounded-tr-none rounded-br-none',
							position === 'prepend' &&
								'rounded-tl-none rounded-bl-none',
							className,
							error && 'border-red-700'
						)}
						ref={ref}
						id={id}
						defaultValue=""
						onChange={onChange}
					>
						<option value="" disabled>
							{placeholder}
						</option>
						{items?.map((item, i) => (
							<option value={item} key={i}>
								{item}
							</option>
						))}
					</select>

					{position === 'append' && children}
				</div>
			</div>
		);
	}
);

export default Select;
