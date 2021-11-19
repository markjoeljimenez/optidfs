import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '../../../../hooks';
import { StatusTranslation } from '../../../../interfaces/IStatus';
import { filterPlayers } from '../../../Players/Players.actions';

// a unique option from a list
export function MultiSelectColumnFilter({
	column: { filterValue, setFilter, preFilteredRows, id },
}) {
	const dispatch = useAppDispatch();
	const [showFilters, setShowFilters] = useState(false);
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
		<div>
			<button onClick={() => setShowFilters(!showFilters)}>
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
			</button>
			<div
				className="absolute"
				style={{
					left: '2rem',
					top: 'calc(100% + 0.5rem)',
				}}
				hidden={showFilters}
			>
				<form className="bg-white space-y-4">
					<label
						className="block"
						htmlFor="status-filter-all"
						key="status-filter-option"
					>
						<input
							className="mr-2"
							type="radio"
							checked={!filterValues.length}
							name="status-filter-all"
							id="status-filter-option"
							onChange={onAllClick}
							value="all"
						/>
						All
					</label>
					{options.map((option) => (
						<label
							className="block"
							htmlFor={`status-filter-${option}`}
							key={`status-filter-${option}`}
						>
							<input
								className="mr-2"
								type="checkbox"
								name={`status-filter-${option}`}
								id={`status-filter-${option}`}
								onChange={onChange}
								value={option as any}
								checked={filterValues.some(
									(value) => value === option
								)}
							/>
							{StatusTranslation[option as StatusTranslation]}
						</label>
					))}
				</form>
			</div>
		</div>
	);
}
