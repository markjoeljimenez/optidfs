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
				<div className="input-dropdown">
					{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
					<label
						className="form__label u-hidden"
						htmlFor="select-contest"
					>
						Search contest by ID or name
					</label>
					<input
						className="input-dropdown__input"
						{...getInputProps({
							placeholder: 'Search contest by ID or name',
						})}
						placeholder="Search contest by ID or name"
						id="select-contest"
					/>
					{inputValue ? (
						<button
							className="input-dropdown__button"
							onClick={() => {
								console.log(props);
								clearSelection();
								props.resetPlayers();
							}}
							aria-label="clear selection"
							type="button"
						>
							<svg
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
							Clear selection
						</button>
					) : (
						<button
							className="input-dropdown__button"
							{...getToggleButtonProps()}
							type="button"
						>
							<svg
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
							Down
						</button>
					)}
					{isOpen ? (
						<ul
							className="input-dropdown__list"
							{...getMenuProps()}
						>
							{props.contests?.map((item, index) => (
								<li
									className="input-dropdown__item"
									{...getItemProps({
										key: index,
										index,
										item,
									})}
								>
									{item.draft_group_id}-{item.name}
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
