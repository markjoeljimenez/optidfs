import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

import {
	setSetting,
	STACKING_POSITION_SETTINGS,
	STACKING_TYPE,
} from '../../Stacking.actions';

import Input from '../../../../components/form/input';

export interface IMEPT {
	team?: string;
	exposure?: number;
}

const StackSetting = () => {
	const dispatch = useAppDispatch();
	const { teams } = useAppSelector((state) => state.players);

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
					STACKING_TYPE.POSITION,
					STACKING_POSITION_SETTINGS.MAX_EXPOSURE_PER_TEAM,
					undefined,
					maxExposurePerTeam
				)
			);
		}
	}, [maxExposurePerTeam]);

	return (
		<Input label="Max exposure per team">
			<div className="flex">
				<label htmlFor="positionMaxExposurePerTeamSelect">
					<span className="sr-only">Teams</span>
					<div>
						<select
							className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							onChange={handleTeamForMEPT}
							id="positionMaxExposurePerTeamSelect"
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
				<label htmlFor="positionMaxExposurePerTeamInputPlayer">
					<span className="sr-only">Max Exposure</span>
					<input
						className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="maxExposurePerTeamInputPlayer"
						placeholder="0"
						step={0.1}
						type="number"
						min={0.1}
						max={1}
						onChange={handleExposureForMEPT}
					/>
				</label>
			</div>
		</Input>
	);
};

export default StackSetting;
