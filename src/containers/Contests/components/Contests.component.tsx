import clsx from 'clsx';
import { useCombobox, UseComboboxStateChange } from 'downshift';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useGetContestsFromSportQuery } from '../api';
import { IContest } from '../interfaces/IContest';
import { setGameType, setSelectedContest } from '../reducers/Contests.reducers';

export const Contests = () => {
	const { contests, providers, sports } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	const { data, isSuccess } = useGetContestsFromSportQuery(
		{
			provider: providers.provider,
			sport:
				sports.selectedSport?.regionAbbreviatedSportName ??
				sports.selectedSport?.sportId,
			sportId: sports.selectedSport?.sportId,
		},
		{
			skip: providers.provider === null || sports.selectedSport === null,
		}
	);

	const [searchedContests, setSearchedContests] = useState(data ?? []);

	function onStateChange(selection: UseComboboxStateChange<IContest>) {
		if (!selection?.selectedItem) {
			return;
		}

		const { selectedItem } = selection;

		if (selectedItem) {
			dispatch(setSelectedContest(selectedItem));

			if (selectedItem.gameType) {
				dispatch(setGameType(selectedItem.gameType));
			}
		}
	}

	useEffect(() => {
		if (data) {
			setSearchedContests(data);

			if (contests.selectedContest) {
				const foundContest = data?.find(
					(contest) =>
						contest.contest_id ===
							contests?.selectedContest!.contest_id &&
						contest.name === contests.selectedContest.name
				);

				if (!foundContest) {
					toast.error(
						`No contest found with id: ${
							contests.selectedContest!.contest_id
						}`
					);

					return;
				}

				dispatch(setSelectedContest(foundContest));
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
		items: searchedContests,
		onInputValueChange: ({ inputValue }) => {
			if (data) {
				setSearchedContests(
					data.filter(
						(contest) =>
							contest.name
								.toLocaleLowerCase()
								.includes(inputValue!.toLocaleLowerCase()) ||
							contest.contest_id.toString().includes(inputValue!)
					)!
				);
			}
		},
		onStateChange,
		selectedItem: contests.selectedContest,
	});

	return (
		<div
			{...getComboboxProps()}
			className="relative z-20"
			data-testid="downshift"
		>
			{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
			<label
				className="hidden"
				htmlFor="select-contest"
				{...getLabelProps()}
			>
				Search contest by ID or name
			</label>
			<input
				className="md:min-w-dropdown h-full shadow appearance-none border rounded w-full py-3 px-4 pr-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline truncate"
				id="select-contest"
				{...getInputProps({
					placeholder: 'Search contest by ID or name',
				})}
			/>
			<button
				{...getToggleButtonProps()}
				className="absolute inset-y-0 right-0 px-2 text-gray-700 border-l border-gray-300"
				type="button"
			>
				<svg
					className="fill-current"
					height="24"
					viewBox="0 0 24 24"
					width="24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g data-name="Layer 2">
						<g data-name="chevron-down">
							<rect height="24" opacity="0" width="24" />
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
					(isSuccess ? (
						searchedContests.map((item, index) => (
							<li
								className="p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
								{...getItemProps({
									index,
									item,
								})}
								key={index}
							>
								{item.contest_id} - {item.name}
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
