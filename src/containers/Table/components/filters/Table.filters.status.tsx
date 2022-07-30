import { Popover, Transition } from '@headlessui/react';
import { Column } from '@tanstack/react-table';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from 'src/hooks';
import { StatusMap, TStatus } from 'src/interfaces/Status';

import { IPlayer } from '@/containers/Players';

interface IStatusFilter {
	column: Column<IPlayer, unknown>;
}

const TableStatusFilter = ({ column }: IStatusFilter) => {
	const dispatch = useAppDispatch();

	const options: TStatus[] = [...column.getFacetedUniqueValues().keys()];
	const [value, setValue] = useState<string[]>(
		(column.getFilterValue() as string[]) ?? []
	);

	function onChange(e: ChangeEvent<HTMLInputElement>) {
		const { value } = e.currentTarget;

		setValue((old: string[]) => {
			if (old) {
				if (old.includes(value)) {
					return old.filter((v) => v !== value);
				}

				return [...old, value];
			}

			return [value];
		});
	}

	function onAllChange() {
		setValue([]);
	}

	useEffect(() => {
		column.setFilterValue(value);
	}, [value]);

	return (
		<Popover className="relative inline-block text-left normal-case tracking-normal font-normal">
			{({ open }) => (
				<>
					<Popover.Button data-testid="table-filter">
						<svg
							className="h-5 w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
							/>
						</svg>
					</Popover.Button>

					<Transition
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
						show={open}
					>
						<Popover.Panel className="origin-top-right absolute left-0 py-2 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="py-1">
								<ul>
									<li>
										<label
											key="status-filter-option"
											className="text-gray-700 block px-4 py-2"
											htmlFor="status-filter-all"
											id="menu-item-0"
											role="menuitem"
											tabIndex={-1}
										>
											<input
												checked={
													value === undefined ||
													value.length === 0
												}
												className="mr-2 text-sm"
												id="status-filter-option"
												name="status-filter-all"
												type="radio"
												onChange={onAllChange}
											/>
											All
										</label>
									</li>
									{options.map((option) => (
										<li key={option}>
											<label
												className="text-gray-700 block px-4 py-2"
												htmlFor={`status-filter-${option}`}
												id={`menu-item-${option}`}
												role="menuitem"
												tabIndex={-1}
											>
												<input
													checked={value.some(
														(v) => v === option
													)}
													className="mr-2 text-sm"
													id={`status-filter-${option}`}
													name={`status-filter-${option}`}
													type="checkbox"
													value={option ?? ''}
													onChange={onChange}
												/>
												{
													StatusMap.get(option)
														?.translation
												}
											</label>
										</li>
									))}
								</ul>
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
};

export default TableStatusFilter;
