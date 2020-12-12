import { useRef, useEffect } from 'react';
import Downshift from 'downshift';
import { IContest } from '../interfaces/IApp';

const Dropdown = (props: any) => {
	const ref = useRef<any | null>(null);

	const { players } = props;

	useEffect(() => {
		if (!players && ref.current) {
			ref.current.clearSelection();
		}
	}, [players]);

	return (
		<Downshift
			onChange={(selection: IContest | null) =>
				props.getPlayers(selection?.draft_group_id)
			}
			// onChange={
			// 	onContestChange && ((selection) => onContestChange(selection))
			// }
			itemToString={(item) => (item ? item.name : '')}
			ref={ref}
		>
			{({
				getToggleButtonProps,
				getMenuProps,
				getInputProps,
				getItemProps,
				inputValue,
				isOpen,
				clearSelection,
				selectedItem,
				highlightedIndex,
			}) => (
				<div className="relative">
					{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
					<label className="hidden" htmlFor="select-contest">
						Search contest by ID or name
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-3 px-4 pr-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline truncate"
						{...getInputProps({
							placeholder: 'Search contest by ID or name',
						})}
						placeholder="Search contest by ID or name"
						id="select-contest"
					/>
					{inputValue ? (
						<button
							onClick={() => {
								clearSelection();
								props.resetPlayers();
								props.resetRules();
							}}
							aria-label="clear selection"
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
							<span className="sr-only">Clear selection</span>
						</button>
					) : (
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
										<rect
											width="24"
											height="24"
											opacity="0"
										/>
										<path d="M12 15.5a1 1 0 0 1-.71-.29l-4-4a1 1 0 1 1 1.42-1.42L12 13.1l3.3-3.18a1 1 0 1 1 1.38 1.44l-4 3.86a1 1 0 0 1-.68.28z" />
									</g>
								</g>
							</svg>
							<span className="sr-only">Down</span>
						</button>
					)}
					{isOpen ? (
						<ul
							className="absolute top-1/1 left-0 right-0 max-h-20 bg-white overflow-y-scroll shadow border rounded mt-4 z-10"
							{...getMenuProps()}
						>
							{props.contests?.map((item, index) => (
								<li
									className="p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
									{...getItemProps({
										key: index,
										index,
										item,
									})}
								>
									{item.name}
								</li>
							))}
						</ul>
					) : null}
				</div>
			)}
		</Downshift>
	);
};

export default Dropdown;
