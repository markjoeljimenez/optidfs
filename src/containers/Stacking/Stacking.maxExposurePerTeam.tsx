import { ChangeEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { setSetting, STACKING_SETTINGS } from './Stacking.actions';

interface IMEPT {
	team?: string;
	exposure?: number;
}

interface IStackingSetting {
	teams: string[];
	stacking: any;
	setStackingSetting(
		setting: string,
		key: string | undefined,
		value: IMEPT
	): void;
}

const StackSetting = ({
	stacking,
	teams,
	setStackingSetting,
}: IStackingSetting) => {
	const [maxExposurePerTeam, setMaxExposurePerTeam] = useState<
		IMEPT | undefined
	>();

	function handleTeamForMEPT(e: ChangeEvent<HTMLSelectElement>) {
		const { value } = e.currentTarget;

		setMaxExposurePerTeam({
			team: value,
			exposure: maxExposurePerTeam?.exposure || undefined,
		});
	}

	function handleExposureForMEPT(e: ChangeEvent<HTMLInputElement>) {
		const { value } = e.currentTarget;

		setMaxExposurePerTeam({
			team: maxExposurePerTeam?.team || undefined,
			exposure: parseFloat(value),
		});
	}

	useEffect(() => {
		if (maxExposurePerTeam?.exposure && maxExposurePerTeam?.team) {
			setStackingSetting(
				STACKING_SETTINGS.MAX_EXPOSURE_PER_TEAM,
				undefined,
				maxExposurePerTeam
			);
		}
	}, [maxExposurePerTeam]);

	return (
		<>
			<span className="inline-block mb-2 text-xs uppercase font-black">
				Max Exposure Per Team
			</span>
			<div className="flex">
				<label htmlFor="team">
					<span className="sr-only">Teams</span>
					<div>
						<select
							className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							onChange={handleTeamForMEPT}
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
						onChange={handleExposureForMEPT}
					/>
				</label>
			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(StackSetting);
