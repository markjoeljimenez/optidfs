import { IContest } from '../interfaces/IContest';
import { IDraftKingsContest } from '../interfaces/IDraftKingsContest';
import { IYahooContest } from '../interfaces/IYahooContest';
import { selectProviders } from '@/containers/Providers';
import { setGameType, setSelectedContest } from '../redux/reducers';
import { sportsState } from '@/containers/Sports';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useCombobox, UseComboboxStateChange } from 'downshift';
import { useGetContestsFromSportQuery } from '../../../api';
import { useState, useEffect, useRef } from 'react';
import {
	mapDraftKingsContests,
	mapYahooContests,
} from '../services/mapContests';
import clsx from 'clsx';
import { useLocalStorage } from 'react-use';

const Dropdown = () => {
	const { sports, providers, contests } = useAppSelector((state) => state);
	// const sports = useAppSelector(sportsState);
	// const providers = useAppSelector(selectProviders);
	const dispatch = useAppDispatch();

	const [localStorage, setLocalStorage] = useLocalStorage(
		'optidfs-initial-visit'
	);

	const { data } = useGetContestsFromSportQuery({
		sportId: sports.selectedSport!.sportId,
		sport: sports.selectedSport!.regionAbbreviatedSportName,
		provider: providers.provider!,
	});

	const [defaultContests, setDefaultContests] = useState<IContest[]>([]);
	const [filteredContests, setFilteredContests] = useState<IContest[]>([]);

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

			// dispatch(setContest(selectedItem));
			// dispatch(getPlayers(selectedItem.id));
		}
	}

	useEffect(() => {
		if (data) {
			const transformedContests =
				data.provider === 'draftkings'
					? mapDraftKingsContests(
							data.contests as IDraftKingsContest[]
					  )
					: mapYahooContests(data.contests as IYahooContest[]);

			setDefaultContests(transformedContests);
			setFilteredContests(transformedContests);
		}
	}, [data, localStorage]);

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
		items: filteredContests,
		onInputValueChange: ({ inputValue }) => {
			setFilteredContests(
				inputValue && inputValue !== ''
					? defaultContests.filter((contest) =>
							contest.name
								.toLowerCase()
								.includes(inputValue?.toLocaleLowerCase())
					  )
					: defaultContests
			);
		},
		selectedItem: defaultContests.find(
			(contest) => contest.id === contests?.selectedContest?.id
		),
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
				{isOpen && filteredContests?.length ? (
					<>
						{filteredContests?.map((item, index) => (
							<li
								className="p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
								{...getItemProps({
									index,
									item,
								})}
								key={index}
							>
								{item.gameType || item.id} - {item.name}
							</li>
						))}
					</>
				) : null}
			</ul>
		</div>
	);
};

export default Dropdown;
