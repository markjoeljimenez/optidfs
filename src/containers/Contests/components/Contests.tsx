import clsx from 'clsx';
import { useCombobox, UseComboboxStateChange } from 'downshift';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAppLocalStorage } from 'src/hooks/useAppLocalStorage';

import { useGetContestsFromSportQuery } from '../../../api';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { IContest } from '../interfaces/IContest';
import { setGameType, setSelectedContest } from '../redux/reducers';

const Dropdown = () => {
	const { contests, providers, sports } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const [localStorage, setLocalStorage] = useAppLocalStorage();

	const { data } = useGetContestsFromSportQuery(
		{
			sportId: sports.selectedSport?.sportId,
			sport: sports.selectedSport?.regionAbbreviatedSportName,
			provider: providers.provider,
		},
		{
			skip:
				providers.provider === null ||
				sports.selectedSport === undefined,
		}
	);

	const [defaultContests, setDefaultContests] = useState<IContest[]>(
		data?.contests ?? []
	);
	const [selectedItem, setSelectedItem] = useState<IContest>();

	function onStateChange(selection: UseComboboxStateChange<IContest>) {
		if (!selection?.selectedItem) {
			return;
		}

		const { selectedItem } = selection;

		if (selectedItem) {
			dispatch(setSelectedContest(selectedItem));

			setLocalStorage({
				...localStorage,
				contest: selectedItem,
			});

			if (selectedItem.gameType) {
				dispatch(setGameType(selectedItem.gameType));
			}
		}
	}

	useEffect(() => {
		if (contests.selectedContest && !localStorage?.contest) {
			setLocalStorage({
				...localStorage,
				contest: contests.selectedContest,
			});
		}
	}, [contests]);

	useEffect(() => {
		if (data) {
			setDefaultContests(data.contests);

			if (contests.selectedContest) {
				const foundContest = data?.contests.find(
					(contest) => contest.id === contests?.selectedContest!.id
				);

				if (!foundContest) {
					toast.error(
						`No contest found with id: ${
							contests.selectedContest!.id
						}`
					);

					return;
				}

				setSelectedItem(foundContest);
			}
		}
	}, [data]);

	const {
		getComboboxProps,
		getInputProps,
		getItemProps,
		getLabelProps,
		getMenuProps,
		getToggleButtonProps,
		isOpen,
	} = useCombobox({
		itemToString: (item) => (item ? item.name : ''),
		items: defaultContests,
		onInputValueChange: ({ inputValue }) => {
			if (data?.contests) {
				setDefaultContests(
					data?.contests.filter((contest) =>
						contest.name
							.toLocaleLowerCase()
							.includes(inputValue!.toLocaleLowerCase())
					)!
				);
			}
		},
		selectedItem,
		onStateChange,
	});

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
				className="md:min-w-dropdown h-full shadow appearance-none border rounded w-full py-3 px-4 pr-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline truncate"
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
			<ul
				className={clsx(
					isOpen &&
						'absolute top-1/1 left-0 right-0 max-h-20 bg-white overflow-y-scroll shadow border rounded mt-4 z-10'
				)}
				{...getMenuProps()}
			>
				{isOpen &&
					(defaultContests.length ? (
						defaultContests?.map((item, index) => (
							<li
								className="p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
								{...getItemProps({
									index,
									item,
								})}
								key={index}
							>
								{item.gameType} - {item.name}
							</li>
						))
					) : (
						<li className="p-4 border-b border-gray-300">
							No contests found
						</li>
					))}
			</ul>
		</div>
	);
};

export default Dropdown;
