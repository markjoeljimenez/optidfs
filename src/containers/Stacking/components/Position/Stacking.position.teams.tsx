import { useRef, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

import {
	setSetting,
	removeFromSetting,
	STACKING_POSITION_SETTINGS,
	STACKING_TYPE,
} from '../../Stacking.actions';

import AddFromSelect from '../../../../components/form/addFromSelect';

const StackingSetting = () => {
	const dispatch = useAppDispatch();
	const { stacking, players } = useAppSelector((state) => state);

	const teamsSelectRef = useRef<HTMLSelectElement>(null);
	const currentTeams =
		stacking[STACKING_TYPE.POSITION]?.[
			STACKING_POSITION_SETTINGS.FOR_TEAMS
		];

	const handleAddTeam = () => {
		if (teamsSelectRef.current && teamsSelectRef.current.value !== '') {
			const { value } = teamsSelectRef.current;

			if (currentTeams?.some((team) => team === value)) {
				return;
			}

			const transformedTeams = currentTeams
				? [...currentTeams, value]
				: [value];

			dispatch(
				setSetting(
					STACKING_TYPE.POSITION,
					STACKING_POSITION_SETTINGS.FOR_TEAMS,
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
				STACKING_TYPE.POSITION,
				STACKING_POSITION_SETTINGS.FOR_TEAMS,
				value
			)
		);
	};

	return players?.teams ? (
		<AddFromSelect
			select={{
				id: 'forTeams',
				items: players.teams,
				label: 'For teams',
				placeholder: 'Select teams',
			}}
			list={{
				items: currentTeams,
				onClick: handleRemoveTeam,
				props: {
					'data-stacking-type': STACKING_TYPE.POSITION,
				},
			}}
			onAdd={handleAddTeam}
			ref={teamsSelectRef}
		/>
	) : (
		<></>
	);
};

export default StackingSetting;
