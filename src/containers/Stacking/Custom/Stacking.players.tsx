import { useRef, useState } from 'react';
import { connect } from 'react-redux';

import InputGroup from '../../../components/form/inputGroup';
import {
	removeFromSetting,
	setSetting,
	STACKING_CUSTOM_SETTINGS,
	STACKING_TYPE,
} from '../Stacking.actions';

interface IStackingSettings {
	allPlayers: any;
	stacking: any;
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
	setStackingSetting,
	removeFromStackingSetting,
}: IStackingSettings) => {
	const playerSelectRef = useRef<HTMLSelectElement>(null);
	const [players, setPlayers] = useState<any[]>([]);

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
		if (players.length >= 0) {
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
		}
	}

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
			{players.map((player) => (
				<p key={player.id}>
					{player.first_name} {player.last_name}
				</p>
			))}
			<button
				className="px-6 py-2 ml-4 font-black rounded-lg bg-blue-300 text-blue-900"
				type="button"
				onClick={handleAddStack}
			>
				Add stack
			</button>
			{currentStacks?.map((stack, i) => (
				<div className="mt-6" key={`stack-${i}`}>
					<h2>Stack {i + 1}</h2>
					{stack.players.map(({ id, first_name, last_name }) => (
						<p key={`stack-player-${id}`}>
							{id} - {first_name} {last_name}
						</p>
					))}
				</div>
			))}
		</>
	) : (
		<></>
	);
};

const mapStateToProps = ({ table, stacking }) => ({
	allPlayers: table.players,
	stacking,
});

const mapDispatchToProps = (dispatch) => ({
	setStackingSetting: (stackingType, setting, key, value) =>
		dispatch(setSetting(stackingType, setting, key, value)),
	removeFromStackingSetting: (stackingType, setting, key) =>
		dispatch(removeFromSetting(stackingType, setting, key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StackingSettings);
