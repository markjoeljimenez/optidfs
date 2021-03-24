import { useRef, useState, useEffect } from 'react';
import { useCombobox, UseComboboxStateChange } from 'downshift';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { setGameType } from './Dropdown.actions';
import { getPlayers } from '../Players/Players.actions';
import { resetRules } from '../Rules/Rules.actions';

import { IContest } from '../../interfaces/IApp';

const Dropdown = () => {
	const { contests } = useAppSelector((state) => state.contests);
	const dispatch = useAppDispatch();

	// const ref = useRef<any | null>(null);

	const [filteredContests, setFilteredContests] = useState(contests);

	function onStateChange(selection: UseComboboxStateChange<IContest>) {
		if (selection?.selectedItem?.draft_group_id) {
			dispatch(getPlayers(selection?.selectedItem?.draft_group_id));
		}

		if (selection?.selectedItem?.game_type) {
			dispatch(setGameType(selection?.selectedItem?.game_type));
		}
	}

	useEffect(() => {
		setFilteredContests(contests);
	}, [contests]);

	const {
		isOpen,
		getToggleButtonProps,
		getLabelProps,
		getMenuProps,
		getInputProps,
		getComboboxProps,
		getItemProps,
	} = useCombobox({
		itemToString: (item) => (item ? item.name : ''),
		items: filteredContests || [],
		onInputValueChange: ({ inputValue }) => {
			setFilteredContests(
				inputValue && inputValue !== ''
					? filteredContests?.filter((contest) =>
							contest.name
								.toLowerCase()
								.includes(inputValue?.toLocaleLowerCase())
					  )
					: contests
			);
		},
		onStateChange,
	});

	// useEffect(() => {
	// 	if (!players && ref.current) {
	// 		ref.current.clearSelection();
	// 	}
	// }, [players]);

	return (
		<div className="relative" {...getComboboxProps()}>
			{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
			<label
				className="hidden"
				htmlFor="select-contest"
				{...getLabelProps()}
			>
				Search contest by ID or name
			</label>
			<input
				id="select-contest"
				className="shadow appearance-none border rounded w-full py-3 px-4 pr-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline truncate"
				{...getInputProps({
					placeholder: 'Search contest by ID or name',
				})}
			/>
			<button
				{...getToggleButtonProps()}
				type="button"
				className="absolute inset-y-0 right-0 px-2 text-gray-700 border-l border-gray-300"
			>
				<svg
					className="fill-current"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="24"
					height="24"
				>
					<g data-name="Layer 2">
						<g data-name="chevron-down">
							<rect width="24" height="24" opacity="0" />
							<path d="M12 15.5a1 1 0 0 1-.71-.29l-4-4a1 1 0 1 1 1.42-1.42L12 13.1l3.3-3.18a1 1 0 1 1 1.38 1.44l-4 3.86a1 1 0 0 1-.68.28z" />
						</g>
					</g>
				</svg>
				<span className="sr-only">Down</span>
			</button>
			{isOpen && filteredContests?.length ? (
				<ul
					className="absolute top-1/1 left-0 right-0 max-h-20 bg-white overflow-y-scroll shadow border rounded mt-4 z-10"
					{...getMenuProps()}
				>
					{filteredContests?.map((item, index) => (
						<li
							className="p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
							{...getItemProps({
								index,
								item,
							})}
							key={index}
						>
							{item.game_type}
							{' '}
							-
							{item.name}
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
};

export default Dropdown;
