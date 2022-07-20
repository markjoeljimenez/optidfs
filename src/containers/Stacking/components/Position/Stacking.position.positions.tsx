import { MouseEvent,useRef } from 'react';

import SelectWithAdd from '../../../../components/form/selectWithAdd';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
	removeFromSetting,
	setSetting,
	STACKING_POSITION_SETTINGS,
	STACKING_TYPE,
} from '../../Stacking.actions';

const StackingSetting = () => {
	const dispatch = useAppDispatch();
	const { players, stacking } = useAppSelector((state) => state);

	const positionsSelectRef = useRef<HTMLSelectElement>(null);
	const currentPositions =
		stacking[STACKING_TYPE.POSITION]?.[
			STACKING_POSITION_SETTINGS.NUMBER_OF_POSITIONS
		];

	const isError = stacking.POSITION && !stacking.POSITION.NUMBER_OF_POSITIONS;

	function handleAddPosition(e: MouseEvent<HTMLButtonElement>) {
		if (
			positionsSelectRef.current &&
			positionsSelectRef.current.value !== ''
		) {
			const { value } = positionsSelectRef.current;

			if (currentPositions?.some((team) => team === value)) {
				return;
			}

			const transformedPositions = currentPositions
				? [...currentPositions, value]
				: [value];

			dispatch(
				setSetting(
					STACKING_TYPE.POSITION,
					STACKING_POSITION_SETTINGS.NUMBER_OF_POSITIONS,
					undefined,
					transformedPositions
				)
			);
		}
	}

	function handleRemovePosition(e: MouseEvent<HTMLButtonElement>) {
		const { value } = e.currentTarget;

		dispatch(
			removeFromSetting(
				STACKING_TYPE.POSITION,
				STACKING_POSITION_SETTINGS.NUMBER_OF_POSITIONS,
				value
			)
		);
	}

	return players.positions ? (
		<div>
			<SelectWithAdd
				select={{
					id: 'mainPositions',
					items: players.positions,
					label: 'Main Positions (Required)',
					placeholder: 'Select position',
				}}
				list={{
					items: currentPositions,
					onClick: handleRemovePosition,
					props: {
						'data-stacking-type': STACKING_TYPE.POSITION,
					},
				}}
				error={{
					isError,
					message: 'Field cannot remain empty',
				}}
				onAdd={handleAddPosition}
				ref={positionsSelectRef}
			/>
		</div>
	) : (
		<></>
	);
};

export default StackingSetting;
