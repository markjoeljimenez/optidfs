import { useRef, MouseEvent } from 'react';
import { connect } from 'react-redux';

import { setSetting, STACKING_SETTINGS } from './Stacking.actions';

interface IStackingSetting {
	teams: string[];
	stacking: any;
	setStackingSetting(
		setting: string,
		key: string | undefined,
		value: string[]
	): void;
}

const StackingSetting = ({
	teams,
	stacking,
	setStackingSetting,
}: IStackingSetting) => {
	const teamSelectRef = useRef<HTMLSelectElement>(null);
	const currentTeams = stacking[STACKING_SETTINGS.FROM_TEAMS];

	function handleAddTeam(e: MouseEvent<HTMLButtonElement>) {
		if (teamSelectRef.current) {
			const { value } = teamSelectRef.current;

			if (currentTeams?.some((team) => team === value)) {
				return;
			}

			const transformedTeams = currentTeams
				? [...currentTeams, value]
				: [value];

			setStackingSetting(
				STACKING_SETTINGS.FROM_TEAMS,
				undefined,
				transformedTeams
			);
		}
	}

	function handleRemoveTeam(e: MouseEvent<HTMLButtonElement>) {
		const { value } = e.currentTarget;

		const transformedTeams = currentTeams.filter((team) => team !== value);

		setStackingSetting(
			STACKING_SETTINGS.FROM_TEAMS,
			undefined,
			transformedTeams
		);
	}

	return (
		<>
			<span className="inline-block mb-2 text-xs uppercase font-black">
				Teams
			</span>
			<div className="flex">
				<label htmlFor="team">
					<span className="sr-only">Teams</span>
					<div>
						<select
							className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							ref={teamSelectRef}
							id="team"
						>
							<option value="" disabled selected>
								Select team
							</option>
							{teams?.map((team) => (
								<option value={team} key={team}>
									{team}
								</option>
							))}
						</select>
					</div>
				</label>
				<button
					className="px-6 py-2 ml-4 font-black rounded-lg bg-blue-300 text-blue-900"
					type="submit"
					onClick={handleAddTeam}
				>
					Add
				</button>
			</div>

			{currentTeams?.map((team) => (
				<button
					className="relative py-1 px-3 pr-8 rounded-full text-sm uppercase font-black text-black bg-orange-400"
					type="button"
					onClick={handleRemoveTeam}
					value={team}
					key={team}
				>
					{team}
					<div className="absolute inset-y-0 right-0 flex items-center mr-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="20"
							height="20"
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
					</div>
				</button>
			))}
		</>
	);
};

const mapStateToProps = ({ table, stacking }) => ({
	stacking,
	teams: table.teams,
});

const mapDispatchToProps = (dispatch) => ({
	setStackingSetting: (setting, key, value) =>
		dispatch(setSetting(setting, key, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StackingSetting);