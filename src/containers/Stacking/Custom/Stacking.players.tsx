import clsx from 'clsx';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import InputGroup from '../../../components/form/inputGroup';
import {
	setSetting,
	STACKING_CUSTOM_SETTINGS,
	STACKING_TYPE,
} from '../Stacking.actions';

interface IStackingSettings {
	defaultPlayers: any;
	stacking: any;
	setStackingSetting(
		stackingType: string,
		setting: string,
		key: string | undefined,
		value: string[]
	): void;
}

export const DEFAULT_TYPE = 'stack';

const StackingSettings = ({
	defaultPlayers,
	stacking,
	setStackingSetting,
}: IStackingSettings) => {
	const playerSelectRef = useRef<HTMLSelectElement>(null);
	const tableRef = useRef<HTMLTableElement>(null);
	const groupRadioButtonRef = useRef<HTMLInputElement>(null);
	const stackRadioButtonRef = useRef<HTMLInputElement>(null);
	const maxExposureInputRef = useRef<HTMLInputElement>(null);
	const maxFromGroupInputRef = useRef<HTMLInputElement>(null);

	const [page, setPage] = useState(0);
	const [tableHeight, setTableHeight] = useState(0);

	const currentStacks =
		stacking[STACKING_TYPE.CUSTOM]?.[STACKING_CUSTOM_SETTINGS.STACKS];

	const handleTypeChange = (e: MouseEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;

		const transformedStack = {
			...currentStacks[page],
			TYPE: value,
		};

		currentStacks.splice(page, 1, transformedStack);
	};

	const handleAddPlayer = () => {
		if (playerSelectRef.current && playerSelectRef.current.value !== '') {
			const { value } = playerSelectRef.current;

			if (currentStacks[page].players.length >= 9) {
				alert('Stack is full!');

				return;
			}

			const player = defaultPlayers.find(
				(_player) => _player.id === parseInt(value)
			);

			if (player) {
				if (currentStacks[page].players.includes(player)) {
					return;
				}

				const transformedStack = {
					...currentStacks[page],
					players: [...currentStacks[page].players, player],
				};

				currentStacks.splice(page, 1, transformedStack);

				setStackingSetting(
					STACKING_TYPE.CUSTOM,
					STACKING_CUSTOM_SETTINGS.STACKS,
					undefined,
					currentStacks
				);
			}
		}
	};

	const handleAddStack = () => {
		setStackingSetting(
			STACKING_TYPE.CUSTOM,
			STACKING_CUSTOM_SETTINGS.STACKS,
			undefined,
			[
				...currentStacks,
				{
					players: [],
					TYPE: DEFAULT_TYPE,
				},
			]
		);

		setPage(currentStacks.length);

		// Save table height if larger than before
		if (tableRef.current) {
			const { height } = tableRef.current.getBoundingClientRect();

			if (height > tableHeight) {
				setTableHeight(height);
			}
		}

		if (maxExposureInputRef?.current) {
			maxExposureInputRef.current.value = '';
		}
	};

	const handleStackSelection = (e: MouseEvent<HTMLButtonElement>) => {
		const value = parseInt(e.currentTarget.value);

		setPage(value);
	};

	const handleRemovePlayerFromStack = (e: MouseEvent<HTMLButtonElement>) => {
		const value = parseInt(e.currentTarget.value);
		const playerIndex = currentStacks[page].players.findIndex(
			(player) => player.id === value
		);

		currentStacks[page].players.splice(playerIndex, 1);

		setStackingSetting(
			STACKING_TYPE.CUSTOM,
			STACKING_CUSTOM_SETTINGS.STACKS,
			undefined,
			currentStacks
		);
	};

	const handleDeleteStack = (e: MouseEvent<HTMLButtonElement>) => {
		const value = parseInt(e.currentTarget.value);

		currentStacks.splice(value, 1);

		setStackingSetting(
			STACKING_TYPE.CUSTOM,
			STACKING_CUSTOM_SETTINGS.STACKS,
			undefined,
			currentStacks
		);

		setPage(page - 1 > 0 ? page - 1 : 0);
	};

	const handleMaxExposureUpdate = (e: ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.currentTarget.value);
		const transformedStack = {
			...currentStacks[page],
			MAX_EXPOSURE: value,
		};

		currentStacks.splice(page, 1, transformedStack);
	};

	const handleMaxFromGroupUpdate = (e: ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.currentTarget.value);
		const transformedStack = {
			...currentStacks[page],
			MAX_FROM_GROUP: value,
		};

		currentStacks.splice(page, 1, transformedStack);
	};

	useEffect(() => {
		// Update type
		if (groupRadioButtonRef?.current && stackRadioButtonRef?.current) {
			if (currentStacks[page]?.TYPE === 'group') {
				groupRadioButtonRef.current.checked = true;
			} else {
				stackRadioButtonRef.current.checked = true;
			}
		}

		// Update MAX EXPOSURE
		if (maxExposureInputRef?.current) {
			maxExposureInputRef.current.value =
				currentStacks[page]?.MAX_EXPOSURE || '';
		}

		// Update MAX PLAYERS FROM GROUP
		if (maxFromGroupInputRef?.current) {
			maxFromGroupInputRef.current.value =
				currentStacks[page]?.MAX_FROM_GROUP || '';
		}
	}, [page]);

	return defaultPlayers ? (
		<>
			<InputGroup label="Player">
				<label htmlFor="customPlayers" className="flex-1">
					<span className="sr-only">Players</span>
					<select
						className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="customPlayers"
						defaultValue=""
						ref={playerSelectRef}
					>
						<option value="" disabled>
							Select player
						</option>
						{defaultPlayers.map(
							({ id, first_name, last_name, position }, i) => (
								<option value={id} key={i}>
									{id} - {position} - {first_name} {last_name}
								</option>
							)
						)}
					</select>
				</label>
				<button
					className="px-6 py-2 ml-4 font-black rounded-lg bg-blue-300 text-blue-900"
					type="button"
					onClick={handleAddPlayer}
				>
					Add
				</button>
			</InputGroup>

			<div className="mt-4">
				<div className="border border-gray-300 rounded-t rounded-br">
					{/* Header */}
					<div className="px-4 py-3 flex justify-start text-xs border-b border-gray-300">
						<div className="flex">
							<label
								htmlFor="group"
								className="flex items-center uppercase"
							>
								<input
									className="mr-2"
									id="group"
									name="groupType"
									onClick={handleTypeChange}
									ref={groupRadioButtonRef}
									type="radio"
									value="group"
								/>
								<strong>Group</strong>
							</label>
							<label
								htmlFor="stack"
								className="flex items-center ml-6 uppercase"
							>
								<input
									className="mr-2 px-4 py-2"
									defaultChecked
									id="stack"
									name="groupType"
									onClick={handleTypeChange}
									ref={stackRadioButtonRef}
									type="radio"
									value="stack"
								/>
								<strong>Stack</strong>
							</label>
						</div>
					</div>

					{/* Players */}
					<div
						className="w-full bg-gray-100"
						style={{
							minHeight: tableHeight
								? `${tableHeight}px`
								: '146px',
						}}
						ref={tableRef}
						role="table"
					>
						<div role="rowgroup">
							{page !== undefined &&
							currentStacks[page]?.players.length > 0 ? (
								currentStacks[page].players.map((player) => (
									<div
										key={player.id}
										className="bg-white border-b last:border-b-0 grid grid-cols-custom-stacking-md whitespace-no-wrap overflow-x-auto"
										role="row"
									>
										<div className="px-4 py-3" role="cell">
											{player.position}
										</div>
										<div className="px-4 py-3" role="cell">
											{player.team}
										</div>
										<div className="px-4 py-3" role="cell">
											{player.first_name}{' '}
											{player.last_name}
										</div>
										<div
											className="pl-4 py-3 text-right"
											role="cell"
										>
											<strong>
												{player.points_per_contest}
											</strong>
										</div>
										<div className="px-2 py-3 flex justify-center items-center">
											<button
												type="button"
												onClick={
													handleRemovePlayerFromStack
												}
												value={player.id}
											>
												<p className="sr-only">
													Remove player
												</p>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													width="24"
													height="24"
													className=" text-red-600 fill-current"
												>
													<g data-name="Layer 2">
														<g data-name="minus-circle">
															<rect
																width="24"
																height="24"
																opacity="0"
															/>
															<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
															<path d="M15 11H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z" />
														</g>
													</g>
												</svg>
											</button>
										</div>
									</div>
								))
							) : (
								<div>
									<div className="px-4 py-3 ">
										<strong>
											<i className="text-gray-500">
												No players selected
											</i>
										</strong>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Footer */}
					<div className="flex px-4 py-3 justify-between items-center text-xs border-t">
						{currentStacks[page]?.TYPE === 'stack' ? (
							<p>
								<strong>MAX EXPOSURE</strong>
								<input
									type="number"
									step="0.1"
									max="1"
									className="border-b ml-3"
									onChange={handleMaxExposureUpdate}
									defaultValue={
										currentStacks[page]?.MAX_EXPOSURE
									}
									ref={maxExposureInputRef}
								/>
							</p>
						) : (
							<p>
								<strong>MAX PLAYERS FROM GROUP</strong>
								<input
									type="number"
									step="1"
									// max=""
									className="border-b ml-3"
									onChange={handleMaxFromGroupUpdate}
									defaultValue={
										currentStacks[page]?.MAX_FROM_GROUP
									}
									ref={maxFromGroupInputRef}
								/>
							</p>
						)}

						{currentStacks.length > 1 && (
							<button
								type="button"
								onClick={handleDeleteStack}
								className="text-red-600 uppercase"
								value={page}
							>
								<strong>Delete</strong>
							</button>
						)}
					</div>
				</div>

				{/* Stack/group tabs */}
				<div className="flex">
					<nav>
						<ul className="flex flex-no-wrap">
							{currentStacks?.map((stack, i) => (
								<li>
									<button
										type="button"
										className={clsx(
											'px-4 py-3 rounded-b border border-t-0 border-gray-300 whitespace-no-wrap capitalize',
											page === i
												? 'bg-indigo-200 border-indigo-200'
												: ''
										)}
										onClick={handleStackSelection}
										value={i}
									>
										<strong>Custom {i + 1}</strong>
									</button>
								</li>
							))}
						</ul>
					</nav>
					<button
						type="button"
						className="p-3"
						onClick={handleAddStack}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="16"
							height="16"
							fill="#2C5282"
						>
							<g data-name="Layer 2">
								<g data-name="plus-circle">
									<rect width="24" height="24" opacity="0" />
									<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
									<path d="M15 11h-2V9a1 1 0 0 0-2 0v2H9a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2z" />
								</g>
							</g>
						</svg>
					</button>
				</div>
			</div>
		</>
	) : (
		<></>
	);
};

const mapStateToProps = ({ table, stacking, sports }) => ({
	defaultPlayers: table.defaultPlayers,
	stacking,
});

const mapDispatchToProps = (dispatch) => ({
	setStackingSetting: (stackingType, setting, key, value) =>
		dispatch(setSetting(stackingType, setting, key, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StackingSettings);
