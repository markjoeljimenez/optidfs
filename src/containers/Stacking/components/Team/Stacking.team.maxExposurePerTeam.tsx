import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

import { IMEPT } from '../Position/Stacking.position.maxExposurePerTeam';
import {
	setSetting,
	STACKING_TEAM_SETTINGS,
	STACKING_TYPE,
} from '../../Stacking.actions';

import Input from '../../../../components/form/input';
import Select from '../../../../components/form/select';

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
		<fieldset className="flex">
			<legend className="mb-2 block text-sm font-medium text-gray-700">
				Max exposure per team
			</legend>
			<Select
				id="maxExposurePerTeamSelect"
				items={players.teams!}
				label="Teams"
				onChange={handleTeamForMEPT}
				placeholder="Select team"
			/>
			<Input
				className="ml-3"
				id="maxExposurePerTeamInputTeam"
				label="Exposure"
				max={1}
				min={0.1}
				onChange={handleExposureForMEPT}
				placeholder="0"
				step={0.1}
				type="number"
			/>
		</fieldset>
	);
};

export default StackSetting;
