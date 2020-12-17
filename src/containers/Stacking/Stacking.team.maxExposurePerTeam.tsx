import { ChangeEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import InputGroup from '../../components/form/inputGroup';

import {
	setSetting,
	STACKING_TEAM_SETTINGS,
	STACKING_TYPE,
} from './Stacking.actions';

interface IMEPT {
	team?: string;
	exposure?: number;
}

interface IStackingSetting {
	teams: string[];
	stacking: any;
	setStackingSetting(
		stackingType: string,
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
				STACKING_TYPE.TEAM,
				STACKING_TEAM_SETTINGS.MAX_EXPOSURE_PER_TEAM,
				undefined,
				maxExposurePerTeam
			);
		}
	}, [maxExposurePerTeam]);

	return (
		<InputGroup label="Max exposure per team">
			<div className="flex">
				<label htmlFor="maxExposurePerTeamSelect">
					<span className="sr-only">Teams</span>
					<div>
						<select
							className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							onChange={handleTeamForMEPT}
							id="maxExposurePerTeamSelect"
							defaultValue=""
						>
							<option value="" disabled>
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
				<label htmlFor="maxExposurePerTeamInput">
					<span className="sr-only">Max Exposure</span>
					<input
						className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="maxExposurePerTeamInput"
						placeholder="0"
						step={0.1}
						type="number"
						// min={0}
						max={1}
						onChange={handleExposureForMEPT}
					/>
				</label>
			</div>
		</InputGroup>
	);
};

const mapStateToProps = ({ table, stacking }) => ({
	stacking,
	teams: table.teams,
});

const mapDispatchToProps = (dispatch) => ({
	setStackingSetting: (stackingType, setting, key, value) =>
		dispatch(setSetting(stackingType, setting, key, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StackSetting);
