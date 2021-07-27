import { useRef, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

import {
	removeFromSetting,
	setSetting,
	STACKING_TEAM_SETTINGS,
	STACKING_TYPE,
} from '../../Stacking.actions';

import SelectWithAdd from '../../../../components/form/selectWithAdd';

const StackingSetting = () => {
	const dispatch = useAppDispatch();
	const { stacking, players } = useAppSelector((state) => state);

	const positionsSelectRef = useRef<HTMLSelectElement>(null);
	const currentPositions =
		stacking[STACKING_TYPE.TEAM]?.[STACKING_TEAM_SETTINGS.FROM_POSITIONS];

	function handleAddPosition(e: MouseEvent<HTMLButtonElement>) {
		if (
			positionsSelectRef.current &&
			positionsSelectRef.current.value !== ''
		) {
			const { value } = positionsSelectRef.current;

			if (!value || currentPositions?.some((team) => team === value)) {
				return;
			}

			const transformedTeams = currentPositions
				? [...currentPositions, value]
				: [value];

			dispatch(
				setSetting(
					STACKING_TYPE.TEAM,
					STACKING_TEAM_SETTINGS.FROM_POSITIONS,
					undefined,
					transformedTeams
				)
			);
		}
	}

	function handleRemovePosition(e: MouseEvent<HTMLButtonElement>) {
		const { value } = e.currentTarget;

		dispatch(
			removeFromSetting(
				STACKING_TYPE.TEAM,
				STACKING_TEAM_SETTINGS.FROM_POSITIONS,
				value
			)
		);
	}

	return players.positions ? (
		<SelectWithAdd
			select={{
				id: 'positions',
				items: players.positions,
				label: 'Positions',
				placeholder: 'Select position',
			}}
			list={{
				items: currentPositions,
				onClick: handleRemovePosition,
				props: {
					'data-stacking-type': STACKING_TYPE.TEAM,
				},
			}}
			onAdd={handleAddPosition}
			ref={positionsSelectRef}
		/>
	) : (
		<></>
	);
};

export default StackingSetting;
