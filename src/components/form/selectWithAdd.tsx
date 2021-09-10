import { MouseEvent, forwardRef } from 'react';
import Badge, { BadgeColor } from '../global/badge';

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
							<Badge
								color={BadgeColor.Yellow}
								value={item}
								text={item}
								key={item}
								onClick={list.onClick}
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	)
);

export default SelectWithAdd;
