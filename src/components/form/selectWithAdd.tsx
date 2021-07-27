import { MouseEvent, forwardRef } from 'react';

import Select from './select';

interface IAddFromSelectProps {
	select?: {
		id: string;
		placeholder: string;
		items: string[];
		label: string;
	};
	error?: string;
	list: {
		props?: any;
		items?: string[];
		onClick(e: MouseEvent<HTMLButtonElement>): void;
	};
	onAdd(e: MouseEvent<HTMLButtonElement>): void;
}

// eslint-disable-next-line react/display-name
const SelectWithAdd = forwardRef<HTMLSelectElement, IAddFromSelectProps>(
	({ select, error, list, onAdd }: IAddFromSelectProps, ref) => (
		<div>
			{select && (
				<div>
					<Select
						error={error}
						id={select.id}
						options={select.items}
						label={select.label}
						placeholder={select.placeholder}
						ref={ref}
						position="append"
					>
						<button
							className="px-3 rounded rounded-tl-none rounded-bl-none border border-gray-300 border-l-0 bg-gray-200 focus:bg-indigo-600 hover:bg-indigo-600 focus:text-white hover:text-white"
							type="button"
							onClick={onAdd}
						>
							Add
						</button>
					</Select>
				</div>
			)}

			{list?.items && (
				<ul className="mt-3 -ml-2">
					{list?.items?.map((item, i) => (
						<li key={i} className="inline-block ml-2">
							<button
								className="relative px-3 py-2 pr-6 rounded-full text-xs uppercase bg-yellow-300"
								type="button"
								onClick={list.onClick}
								value={item}
								key={item}
								{...list.props}
							>
								{item}
								<div className="absolute inset-y-0 right-1 flex items-center mr-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-3 w-3"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</div>
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
);

export default SelectWithAdd;
