import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import InputGroup from '../../../components/form/inputGroup';
import {
	removeFromSetting,
	setSetting,
	STACKING_CUSTOM_SETTINGS,
	STACKING_TYPE,
} from '../Stacking.actions';

interface IPositionRow {
	position: string;
	player: null | any;
}

interface IStackingSettings {
	allPlayers: any;
	stacking: any;
	positions?: string[];
	setStackingSetting(
		stackingType: string,
		setting: string,
		key: string | undefined,
		value: string[]
	): void;
	removeFromStackingSetting(
		stackingType: string,
		setting: string,
		key: string
	): void;
}

const StackingSettings = ({
	allPlayers,
	stacking,
	positions,
	setStackingSetting,
	removeFromStackingSetting,
}: IStackingSettings) => {
	const playerSelectRef = useRef<HTMLSelectElement>(null);
	const [players, setPlayers] = useState<any[]>([]);
	// const [transformedPositions, setTransformedPositions] = useState<
	// 	IPositionRow[] | undefined
	// >(
	// 	positions?.map((position) => ({
	// 		position,
	// 		player: null,
	// 	}))
	// );
	const [page, setPage] = useState(0);

	const currentStacks =
		stacking[STACKING_TYPE.CUSTOM]?.[STACKING_CUSTOM_SETTINGS.STACKS];

	function handleAddPlayer() {
		if (playerSelectRef.current && playerSelectRef.current.value !== '') {
			const { value } = playerSelectRef.current;

			if (players.length >= 9) {
				alert('stack is full');

				return;
			}

			const player = allPlayers.find(
				(_player) => _player.id === parseInt(value)
			);

			if (
				player &&
				!players.find((_player) => _player.id === parseInt(value))
			) {
				setPlayers([...players, player]);
			}
		}
	}

	function handleAddStack() {
		if (players.length > 0) {
			const tramsformedStacks = currentStacks
				? [
						...currentStacks,
						{
							players,
						},
				  ]
				: [
						{
							players,
						},
				  ];

			setStackingSetting(
				STACKING_TYPE.CUSTOM,
				STACKING_CUSTOM_SETTINGS.STACKS,
				undefined,
				tramsformedStacks
			);

			setPlayers([]);

			if (currentStacks?.length) {
				setPage(currentStacks?.length);
			}
		}
	}

	function handlePrevClick() {
		setPage(page > 0 ? page - 1 : page);
	}

	function handleNextClick() {
		setPage(page < currentStacks?.length - 1 ? page + 1 : page);
	}

	// useEffect(() => {
	// 	if (currentStacks === undefined || currentStacks.length === 0) {
	// 		return;
	// 	}

	// 	const _players = currentStacks?.[page]?.players;
	// 	const mutablePlayers = _players ? [..._players] : undefined;

	// 	setTransformedPositions(
	// 		transformedPositions?.map(({ position, player }) => {
	// 			const index = mutablePlayers?.findIndex(
	// 				(_player) =>
	// 					_player.position === position || position === 'FLEX'
	// 			);

	// 			console.log(index, player);

	// 			if (index !== undefined && index >= 0) {
	// 				return {
	// 					position,
	// 					player: mutablePlayers?.splice(index, 1)[0],
	// 				};
	// 			}

	// 			return {
	// 				position,
	// 				player: null,
	// 			};
	// 		})
	// 	);
	// }, [currentStacks, page]);

	return allPlayers ? (
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
						{allPlayers.map(
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
			<div className="flex mt-8" style={{ minHeight: '20rem' }}>
				<div className="flex-1">
					<table className="w-full">
						<thead>
							<tr>
								<td
									className="border-b-2 border-gray-300 py-2"
									colSpan={4}
								>
									<strong>Players</strong>
								</td>
							</tr>
						</thead>
						<tbody>
							{players.length ? (
								players.map(
									({
										id,
										team,
										position,
										first_name,
										last_name,
										points_per_contest,
									}) => (
										<tr
											key={id}
											className="border-b-2 border-gray-300"
										>
											<td className="py-2">{position}</td>
											<td className="py-2">{team}</td>
											<td className="py-2">
												{first_name} {last_name}
											</td>
											<td className="py-2 text-right">
												{points_per_contest}
											</td>
										</tr>
									)
								)
							) : (
								<tr>
									<td className="py-2">
										<i className="text-gray-500">
											No players selected
										</i>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
				<div className="flex justify-center items-center flex-col">
					<button
						className="block px-6 py-2 mx-10 font-black rounded-lg bg-blue-300 text-blue-900"
						type="button"
						onClick={handleAddStack}
					>
						Save stack
					</button>
					{/* <button
						className="block px-6 py-2 mx-6 font-black rounded-lg bg-blue-300 text-blue-900 mt-4"
						type="button"
						// onClick={handleAddStack}
					>
						Delete stack
					</button> */}
				</div>
				<div className="flex-1 relative">
					<table className="w-full">
						<thead>
							<tr>
								<td
									className="border-b-2 border-gray-300 py-2"
									colSpan={4}
								>
									<strong>Players</strong>
								</td>
							</tr>
						</thead>
						<tbody>
							{currentStacks?.[page]?.players.map(
								({
									id,
									team,
									position,
									first_name,
									last_name,
									points_per_contest,
								}) => (
									<tr
										key={id}
										className="border-b-2 border-gray-300"
									>
										<td className="py-2">{position}</td>
										<td className="py-2">{team}</td>
										<td className="py-2">
											{first_name} {last_name}
										</td>
										<td className="py-2 text-right">
											{points_per_contest}
										</td>
									</tr>
								)
							)}
						</tbody>
					</table>
					{/* {currentStacks?.[page]?.map((stack, i) => (
						{stack.players.map(
							({ id, first_name, last_name, position }) => (
								<p key={`stack-player-${id}`}>
									{id} - {position} - {first_name}{' '}
									{last_name}
								</p>
							)
						)}
					</div>
					))} */}
					{/* {currentStacks?.map((stack, i) => (
						<div className="mt-6" key={`stack-${i}`}>
							<h2>Stack {i + 1}</h2>
							{stack.players.map(
								({ id, first_name, last_name, position }) => (
									<p key={`stack-player-${id}`}>
										{id} - {position} - {first_name}{' '}
										{last_name}
									</p>
								)
							)}
						</div>
					))} */}
					{/* <ul className="mt-6 ml-6">
						{transformedPositions?.map(
							({ position, player }, i) => (
								<li key={i}>
									{position} - {player?.first_name}{' '}
									{player?.last_name}
								</li>
							)
						)}
					</ul> */}
					{currentStacks?.length > 0 && (
						<div className="absolute bottom-0 left-0 w-full flex items-center justify-between">
							<button type="button" onClick={handlePrevClick}>
								<span className="sr-only">Previous</span>

								<svg
									className="fill-current"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									width="24"
									height="24"
								>
									<g data-name="Layer 2">
										<g data-name="arrow-ios-back">
											<rect
												width="24"
												height="24"
												transform="rotate(90 12 12)"
												opacity="0"
											/>
											<path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z" />
										</g>
									</g>
								</svg>
							</button>
							<p>
								<strong>
									Stack {page + 1} of {currentStacks.length}
								</strong>
							</p>
							<button type="button" onClick={handleNextClick}>
								<span className="sr-only">Next</span>
								<svg
									className="fill-current"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									width="24"
									height="24"
								>
									<g data-name="Layer 2">
										<g data-name="arrow-ios-forward">
											<rect
												width="24"
												height="24"
												transform="rotate(-90 12 12)"
												opacity="0"
											/>
											<path d="M10 19a1 1 0 0 1-.64-.23 1 1 0 0 1-.13-1.41L13.71 12 9.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z" />
										</g>
									</g>
								</svg>
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	) : (
		<></>
	);
};

const mapStateToProps = ({ table, stacking, sports }) => ({
	allPlayers: table.players,
	stacking,
	positions: sports?.sports?.find(({ sportId }) => sportId === sports?.sport)
		?.positions,
});

const mapDispatchToProps = (dispatch) => ({
	setStackingSetting: (stackingType, setting, key, value) =>
		dispatch(setSetting(stackingType, setting, key, value)),
	removeFromStackingSetting: (stackingType, setting, key) =>
		dispatch(removeFromSetting(stackingType, setting, key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StackingSettings);
