import { MouseEvent, useRef } from 'react';
import { connect } from 'react-redux';

import {
	removeSetting,
	setSetting,
	STACKING_SETTINGS,
} from './Stacking.actions';

interface IStackingSetting {
	teams: string[];
	stacking: any;
	setStackingSetting(
		setting: string,
		key: string | undefined,
		value: number
	): void;
	removeStackingSetting(setting: string, value: string): void;
}

const StackSetting = ({
	stacking,
	teams,
	setStackingSetting,
	removeStackingSetting,
}: IStackingSetting) => {
	const teamSelectRef = useRef<HTMLSelectElement>(null);
	const maxExposureInputRef = useRef<HTMLInputElement>(null);
	const currentExposures = stacking[STACKING_SETTINGS.MAX_EXPOSURE_PER_TEAM];

	function handleAddMaxExposurePerTeam(e: MouseEvent<HTMLButtonElement>) {
		if (teamSelectRef.current && maxExposureInputRef.current) {
			const team = teamSelectRef.current.value;
			const value = parseFloat(maxExposureInputRef.current.value);

			setStackingSetting(
				STACKING_SETTINGS.MAX_EXPOSURE_PER_TEAM,
				team,
				value
			);
		}
	}

	function handleRemoveMaxExposurePerTeam(e: MouseEvent<HTMLButtonElement>) {
		const { value } = e.currentTarget;
		const setting = e.currentTarget.getAttribute('data-setting');

		if (!setting) {
			return;
		}

		removeStackingSetting(setting, value);
	}

	return (
		<>
			<span className="inline-block mb-2 text-xs uppercase font-black">
				Max Exposure Per Team
			</span>
			{console.log(currentExposures)}
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
				<label htmlFor="maxExposure">
					<span className="sr-only">Max Exposure</span>
					<input
						className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="maxExposure"
						placeholder="0"
						step={0.1}
						type="number"
						// min={0}
						max={1}
						ref={maxExposureInputRef}
					/>
				</label>
				<button
					className="px-6 py-2 ml-4 font-black rounded-lg bg-blue-300 text-blue-900"
					type="submit"
					onClick={handleAddMaxExposurePerTeam}
				>
					Add
				</button>
			</div>
			{currentExposures?.map(({ key, value }) => (
				<button
					className="relative py-1 px-3 pr-8 rounded-full text-sm uppercase font-black text-black bg-orange-400"
					type="button"
					onClick={handleRemoveMaxExposurePerTeam}
					data-setting={STACKING_SETTINGS.MAX_EXPOSURE_PER_TEAM}
					value={key}
					key={key}
				>
					{key}&nbsp;-&nbsp;{value}
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
	removeStackingSetting: (rule, key) => dispatch(removeSetting(rule, key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StackSetting);
