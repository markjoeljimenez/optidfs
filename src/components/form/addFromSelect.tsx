import clsx from 'clsx';
import { MouseEvent, forwardRef } from 'react';
import InputGroup from './inputGroup';

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
const AddFromSelect = forwardRef<HTMLSelectElement, IAddFromSelectProps>(
	({ select, error, list, onAdd }: IAddFromSelectProps, ref) => (
		<>
			{select && (
				<InputGroup label={select.label} error={error}>
					<label htmlFor={select.id} className="flex-1">
						<span className="sr-only">{select.label}</span>
						<select
							className={clsx(
								'font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
								error && 'border-red-700'
							)}
							ref={ref}
							id={select.id}
							defaultValue=""
						>
							<option value="" disabled>
								{select.placeholder}
							</option>
							{select.items?.map((item, i) => (
								<option value={item} key={i}>
									{item}
								</option>
							))}
						</select>
						{error && (
							<p className="text-red-700 text-xs uppercase font-black mt-3">
								{error}
							</p>
						)}
					</label>
					<button
						className="px-6 py-2 ml-4 font-black rounded-lg bg-blue-300 text-blue-900"
						type="button"
						onClick={onAdd}
					>
						Add
					</button>
				</InputGroup>
			)}

			{list?.items && (
				<ul className="mt-3 -ml-2">
					{list?.items?.map((item, i) => (
						<li key={i} className="inline-block ml-2">
							<button
								className="relative py-1 px-3 pr-8 rounded-full text-sm uppercase font-black text-black bg-orange-400"
								type="button"
								onClick={list.onClick}
								value={item}
								key={item}
								{...list.props}
							>
								{item}
								<div className="absolute inset-y-0 right-0 flex items-center mr-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										width="20"
										height="20"
									>
										<g data-name="Layer 2">
											<g data-name="close">
												<rect
													width="24"
													height="24"
													transform="rotate(180 12 12)"
													opacity="0"
												/>
												<path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
											</g>
										</g>
									</svg>
								</div>
							</button>
						</li>
					))}
				</ul>
			)}
		</>
	)
);

export default AddFromSelect;
