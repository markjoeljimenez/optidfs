import clsx from 'clsx';
import { MouseEvent, forwardRef } from 'react';

interface IAddFromSelectProps {
	select?: {
		id: string;
		placeholder: string;
		items: string[];
		label: string;
	};
	error?: {
		message: string;
	};
	list: {
		props?: any;
		items?: string[];
		onClick(e: MouseEvent<HTMLButtonElement>): void;
	};
	onAdd(e: MouseEvent<HTMLButtonElement>): void;
}

const AddFromSelect = forwardRef<HTMLSelectElement, IAddFromSelectProps>(
	({ select, error, list, onAdd }: IAddFromSelectProps, ref) => (
		<div>
			{select && (
				<div className="relative pt-6 inline-flex align-baseline">
					<p
						className={clsx(
							'text-xs uppercase font-black absolute top-0 left-0 whitespace-no-wrap',
							error && 'text-red-700'
						)}
					>
						{select.label}
					</p>
					<label htmlFor={select.id}>
						<span className="sr-only">{select.label}</span>
						<div>
							<select
								className={clsx(
									'font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
									error && 'border-red-700'
								)}
								ref={ref}
								id={select.id}
							>
								<option value="" disabled selected>
									{select.placeholder}
								</option>
								{select.items?.map((item, i) => (
									<option value={item} key={i}>
										{item}
									</option>
								))}
							</select>
						</div>
						{error && (
							<p className="text-red-700 text-xs uppercase font-black mt-3">
								{error.message}
							</p>
						)}
					</label>
				</div>
			)}

			<button
				className="px-6 py-2 ml-4 font-black rounded-lg bg-blue-300 text-blue-900"
				type="button"
				onClick={onAdd}
			>
				Add
			</button>

			{list?.items && (
				<ul className="mt-3 -ml-2">
					{list?.items?.map((item) => (
						<li className="inline-block ml-2">
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
		</div>
	)
);

export default AddFromSelect;
