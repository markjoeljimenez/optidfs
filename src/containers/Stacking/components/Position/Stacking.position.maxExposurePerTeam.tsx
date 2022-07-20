import { ChangeEvent, useEffect, useState } from 'react';

import Input from '../../../../components/form/input';
import Select from '../../../../components/form/select';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
	setSetting,
	STACKING_POSITION_SETTINGS,
	STACKING_TYPE,
} from '../../Stacking.actions';

export interface IMEPT {
	exposure?: number;
	team?: string;
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
			exposure: maxExposurePerTeam?.exposure || undefined,
			team: value,
		});
	}

	function handleExposureForMEPT(e: ChangeEvent<HTMLInputElement>) {
		const { value } = e.currentTarget;

		setMaxExposurePerTeam({
			exposure: parseFloat(value),
			team: maxExposurePerTeam?.team || undefined,
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
		<fieldset className="flex">
			<legend className="mb-2 block text-sm font-medium text-gray-700">
				Max exposure per team
			</legend>

			<Select
				id="positionMaxExposurePerTeamSelect"
				label="Teams"
				options={teams!}
				placeholder="Select team"
				onChange={handleTeamForMEPT}
			/>
			<Input
				className="ml-3"
				id="maxExposurePerTeamInputPlayer"
				label="Exposure"
				max={1}
				min={0.1}
				placeholder="0"
				step={0.1}
				type="number"
				onChange={handleExposureForMEPT}
			/>
		</fieldset>
	);
};

export default StackSetting;
