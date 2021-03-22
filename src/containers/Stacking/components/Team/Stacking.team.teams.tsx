import { useRef, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

import {
	removeFromSetting,
	setSetting,
	STACKING_TEAM_SETTINGS,
	STACKING_TYPE,
} from '../../Stacking.actions';

import AddFromSelect from '../../../../components/form/addFromSelect';

const StackingSetting = () => {
	const dispatch = useAppDispatch();
	const { stacking, players } = useAppSelector((state) => state);

	const teamSelectRef = useRef<HTMLSelectElement>(null);
	const currentTeams =
		stacking[STACKING_TYPE.TEAM]?.[STACKING_TEAM_SETTINGS.FROM_TEAMS];

	const handleAddTeam = (e: MouseEvent<HTMLButtonElement>) => {
		if (teamSelectRef.current && teamSelectRef.current.value !== '') {
			const { value } = teamSelectRef.current;

			if (!value || currentTeams?.some((team) => team === value)) {
				return;
			}

			const transformedTeams = currentTeams
				? [...currentTeams, value]
				: [value];

			dispatch(
				setSetting(
					STACKING_TYPE.TEAM,
					STACKING_TEAM_SETTINGS.FROM_TEAMS,
					undefined,
					transformedTeams
				)
			);
		}
	};

	const handleRemoveTeam = (e: MouseEvent<HTMLButtonElement>) => {
		const { value } = e.currentTarget;

		dispatch(
			removeFromSetting(
				STACKING_TYPE.TEAM,
				STACKING_TEAM_SETTINGS.FROM_TEAMS,
				value
			)
		);
	};

	return players.teams ? (
		<AddFromSelect
			select={{
				id: 'teamStacking',
				items: players.teams,
				label: 'Teams',
				placeholder: 'Select team',
			}}
			list={{
				items: currentTeams,
				onClick: handleRemoveTeam,
				props: {
					'data-stacking-type': STACKING_TYPE.TEAM,
				},
			}}
			onAdd={handleAddTeam}
			ref={teamSelectRef}
		/>
	) : (
		<></>
	);
};

export default StackingSetting;
