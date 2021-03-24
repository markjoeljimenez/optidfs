import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

import { IMEPT } from '../Position/Stacking.position.maxExposurePerTeam';
import {
	setSetting,
	STACKING_TEAM_SETTINGS,
	STACKING_TYPE,
} from '../../Stacking.actions';

import InputGroup from '../../../../components/form/inputGroup';

const StackSetting = () => {
	const dispatch = useAppDispatch();
	const { players } = useAppSelector((state) => state);
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
			dispatch(
				setSetting(
					STACKING_TYPE.TEAM,
					STACKING_TEAM_SETTINGS.MAX_EXPOSURE_PER_TEAM,
					undefined,
					maxExposurePerTeam
				)
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
							{players.teams?.map((team) => (
								<option value={team} key={team}>
									{team}
								</option>
							))}
						</select>
					</div>
				</label>
				<label htmlFor="maxExposurePerTeamInputTeam">
					<span className="sr-only">Max Exposure</span>
					<input
						className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="maxExposurePerTeamInputTeam"
						placeholder="0"
						step={0.1}
						type="number"
						min={0.1}
						max={1}
						onChange={handleExposureForMEPT}
					/>
				</label>
			</div>
		</InputGroup>
	);
};

export default StackSetting;
