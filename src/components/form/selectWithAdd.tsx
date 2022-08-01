import { forwardRef, MouseEvent } from 'react';

// import { IError } from '../../interfaces/IError';
import Badge, { BadgeColor } from '../global/badge';
import Select from './select';

interface ISelectWithAdd {
	list: {
		onClick(e: MouseEvent<HTMLButtonElement>): void;
		items?: string[];
		props?: any;
	};
	onAdd(e: MouseEvent<HTMLButtonElement>): void;
	// error?: IError;
	select?: {
		id: string;
		items: string[];
		label: string;
		placeholder: string;
	};
}

// eslint-disable-next-line react/display-name
const SelectWithAdd = forwardRef<HTMLSelectElement, ISelectWithAdd>(
	({ list, onAdd, select }: ISelectWithAdd, ref) => (
		<div>
			<div>
				{select && (
					<div>
						<Select
							ref={ref}
							// error={{
							// 	...error,
							// 	message: undefined,
							// }}
							id={select.id}
							label={select.label}
							options={select.items.map((item) => ({
								label: item,
								value: item,
							}))}
							placeholder={select.placeholder}
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
								<Badge
									key={item}
									color={BadgeColor.Yellow}
									text={item}
									value={item}
									onClick={list.onClick}
								/>
							</li>
						))}
					</ul>
				)}
			</div>

			{/* {error?.isError && (
				<div className="mt-2 text-red-500">{error.message}</div>
			)} */}
		</div>
	)
);

export default SelectWithAdd;
