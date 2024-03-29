import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

import {
	setSetting,
	STACKING_POSITION_SETTINGS,
	STACKING_TYPE,
} from '../../Stacking.actions';

import Input from '../../../../components/form/input';
import Select from '../../../../components/form/select';

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
		<fieldset className="flex">
			<legend className="mb-2 block text-sm font-medium text-gray-700">
				Max exposure per team
			</legend>

			<Select
				id="positionMaxExposurePerTeamSelect"
				onChange={handleTeamForMEPT}
				label="Teams"
				options={teams!}
				placeholder="Select team"
			/>
			<Input
				className="ml-3"
				label="Exposure"
				id="maxExposurePerTeamInputPlayer"
				placeholder="0"
				step={0.1}
				type="number"
				min={0.1}
				max={1}
				onChange={handleExposureForMEPT}
			/>
		</fieldset>
	);
};

export default StackSetting;
