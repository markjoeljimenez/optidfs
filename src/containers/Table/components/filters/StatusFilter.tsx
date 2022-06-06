import { Popover, Transition } from '@headlessui/react';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { useAppDispatch } from '../../../../hooks';
import { StatusTranslation } from '../../../../interfaces/IStatus';
import { filterPlayers } from '../../../Players/redux/Players.actions';

export function MultiSelectColumnFilter({
	column: { setFilter, preFilteredRows, id },
}) {
	const dispatch = useAppDispatch();
	const [filterValues, setFilterValues] = useState<string[]>([]);

	// Calculate the options for filtering
	// using the preFilteredRows
	const options = useMemo(() => {
		const options = new Set();

		preFilteredRows.forEach((row) => {
			options.add(row.values[id]);
		});

		return [...options.values()];
	}, [id, preFilteredRows]);

	function onAllClick(e: ChangeEvent<HTMLInputElement>) {
		setFilterValues([]);
	}

	function onChange(e: ChangeEvent<HTMLInputElement>) {
		if (filterValues.find((value) => value === e.currentTarget.value)) {
			setFilterValues(
				filterValues.filter((value) => value !== e.currentTarget.value)
			);
		} else {
			setFilterValues([...filterValues, e.currentTarget.value!]);
		}
	}

	useEffect(() => {
		setFilter(filterValues.length ? filterValues : undefined);
		dispatch(filterPlayers(filterValues.length ? filterValues : 'all'));
	}, [filterValues]);

	// Render a multi-select box
	return (
		<Popover
			// as="div"
			className="relative inline-block text-left normal-case tracking-normal font-normal"
		>
			{({ open }) => (
				<>
					<Popover.Button
					// type="button"
					// // onClick={() => setShowFilters(!showFilters)}
					// id="menu-button"
					// aria-expanded="true"
					// aria-haspopup="true"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
							/>
						</svg>
					</Popover.Button>

					<Transition
						show={open}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Popover.Panel className="origin-top-right absolute left-0 py-2 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="py-1">
								<ul>
									<li>
										<label
											className="text-gray-700 block px-4 py-2"
											htmlFor="status-filter-all"
											key="status-filter-option"
											role="menuitem"
											tabIndex={-1}
											id="menu-item-0"
										>
											<input
												className="mr-2 text-sm"
												type="radio"
												checked={!filterValues.length}
												name="status-filter-all"
												id="status-filter-option"
												onChange={onAllClick}
												value="all"
											/>
											All
										</label>
									</li>
									{options.map((option, i) => (
										<li key={i}>
											<label
												className="text-gray-700 block px-4 py-2"
												htmlFor={`status-filter-${option}`}
												key={`status-filter-${option}`}
												role="menuitem"
												tabIndex={-1}
												id={`menu-item-${i++}`}
											>
												<input
													className="mr-2 text-sm"
													type="checkbox"
													name={`status-filter-${option}`}
													id={`status-filter-${option}`}
													onChange={onChange}
													value={option as any}
													checked={filterValues.some(
														(value) =>
															value === option
													)}
												/>
												{
													StatusTranslation[
														option as StatusTranslation
													]
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
}
