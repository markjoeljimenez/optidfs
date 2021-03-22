import clsx from 'clsx';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

import {
	setSetting,
	STACKING_CUSTOM_SETTINGS,
	STACKING_TYPE,
} from '../../Stacking.actions';

import InputGroup from '../../../../components/form/inputGroup';

const StackingSettings = () => {
	const dispatch = useAppDispatch();
	const { players, stacking } = useAppSelector((state) => state);

	const playerSelectRef = useRef<HTMLSelectElement>(null);
	const tableRef = useRef<HTMLTableElement>(null);
	const maxExposureInputRef = useRef<HTMLInputElement>(null);

	const [page, setPage] = useState(0);
	const [tableHeight, setTableHeight] = useState(0);

	const currentStacks =
		stacking[STACKING_TYPE.CUSTOM]?.[STACKING_CUSTOM_SETTINGS.STACKS];

	const handleAddPlayer = () => {
		if (playerSelectRef.current && playerSelectRef.current.value !== '') {
			const { value } = playerSelectRef.current;

			if (currentStacks[page].players.length >= 9) {
				// eslint-disable-next-line no-alert
				alert('Stack is full!');

				return;
			}

			const player = players.all?.find(
				(_player) => _player.id === parseInt(value)
			);

			if (player) {
				const temp = currentStacks;

				if (temp[page].players.includes(player)) {
					return;
				}

				const transformedStack = {
					...temp[page],
					players: [...temp[page].players, player],
				};

				temp.splice(page, 1, transformedStack);

				dispatch(
					setSetting(
						STACKING_TYPE.CUSTOM,
						STACKING_CUSTOM_SETTINGS.STACKS,
						undefined,
						temp
					)
				);
			}
		}
	};

	const handleAddStack = () => {
		dispatch(
			setSetting(
				STACKING_TYPE.CUSTOM,
				STACKING_CUSTOM_SETTINGS.STACKS,
				undefined,
				[
					...currentStacks,
					{
						players: [],
					},
				]
			)
		);

		setPage(page + 1 || page);

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

		// if (maxExposureInputRef?.current) {
		// 	maxExposureInputRef.current.value =
		// 		currentStacks[page].MAX_EXPOSURE || '';
		// }
	};

	const handleRemovePlayerFromStack = (e: MouseEvent<HTMLButtonElement>) => {
		const value = parseInt(e.currentTarget.value);
		const temp = currentStacks;
		const playerIndex = temp[page].players.findIndex(
			(player) => player.id === value
		);

		temp[page].players.splice(playerIndex, 1);

		dispatch(
			setSetting(
				STACKING_TYPE.CUSTOM,
				STACKING_CUSTOM_SETTINGS.STACKS,
				undefined,
				temp
			)
		);
	};

	const handleDeleteStack = (e: MouseEvent<HTMLButtonElement>) => {
		const value = parseInt(e.currentTarget.value);
		const temp = currentStacks;

		temp.splice(value, 1);

		dispatch(
			setSetting(
				STACKING_TYPE.CUSTOM,
				STACKING_CUSTOM_SETTINGS.STACKS,
				undefined,
				temp
			)
		);

		setPage(page - 1);
	};

	const handleMaxExposureUpdate = (e: ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.currentTarget.value);
		const temp = currentStacks;

		const transformedStack = {
			...temp[page],
			MAX_EXPOSURE: value,
		};

		temp.splice(page, 1, transformedStack);
	};

	useEffect(() => {
		if (maxExposureInputRef?.current) {
			maxExposureInputRef.current.value =
				currentStacks[page]?.MAX_EXPOSURE || '';
		}
	}, [page]);

	return players.all ? (
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
						{players.all?.map(
							({ id, first_name, last_name, position }, i) => (
								<option value={id} key={i}>
									{id}
									{' '}
									-
									{position}
									{' '}
									-
									{first_name}
									{' '}
									{last_name}
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
			{/* <InputGroup label="Max Exposure">
				<label htmlFor="maxExposure">
					<span className="sr-only">Max Exposure</span>
					<input
						className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="maxExposure"
						placeholder="0"
						type="number"
						step={0.1}
						max={1}
						min={0.1}
						ref={maxExposureInputRef}
					/>
				</label>
			</InputGroup> */}
			<div className="mt-4">
				<div className="border border-gray-300 rounded-t rounded-br">
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
											{player.first_name}
											{' '}
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
					<div className="flex px-4 py-3 justify-between items-center text-xs border-t">
						<p>
							<strong>MAX EXPOSURE</strong>
							<input
								type="number"
								step="0.1"
								max="1"
								className="border-b ml-3"
								onChange={handleMaxExposureUpdate}
								defaultValue={currentStacks[page]?.MAX_EXPOSURE}
								ref={maxExposureInputRef}
							/>
						</p>

						{page >= 1 && (
							<button
								type="button"
								onClick={handleDeleteStack}
								className="text-red-600"
								value={page}
							>
								<strong>DELETE STACK</strong>
							</button>
						)}
					</div>
				</div>
				<div className="flex">
					<nav>
						<ul className="flex flex-no-wrap">
							{/* <li>
								<button
									type="button"
									className={clsx(
										'px-4 py-3 rounded-b border border-t-0 border-gray-300 whitespace-no-wrap',
										page === 0
											? 'bg-indigo-200 border-indigo-200'
											: ''
									)}
									onClick={handleStackSelection}
									value={0}
								>
									<strong>Stack 1</strong>
								</button>
							</li> */}
							{currentStacks?.map((stack, i) => (
								<li>
									<button
										type="button"
										className={clsx(
											'px-4 py-3 rounded-b border border-t-0 border-gray-300 whitespace-no-wrap',
											page === i
												? 'bg-indigo-200 border-indigo-200'
												: ''
										)}
										onClick={handleStackSelection}
										value={i}
									>
										<strong>
											Stack
											{i + 1}
										</strong>
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

export default StackingSettings;
