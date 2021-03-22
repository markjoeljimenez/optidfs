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

	const positionsSelectRef = useRef<HTMLSelectElement>(null);
	const currentPositions =
		stacking[STACKING_TYPE.POSITION]?.[
			STACKING_POSITION_SETTINGS.NUMBER_OF_POSITIONS
		];

	const handleAddPosition = (e: MouseEvent<HTMLButtonElement>) => {
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
	};

	const handleRemovePosition = (e: MouseEvent<HTMLButtonElement>) => {
		const { value } = e.currentTarget;

		dispatch(
			removeFromSetting(
				STACKING_TYPE.POSITION,
				STACKING_POSITION_SETTINGS.NUMBER_OF_POSITIONS,
				value
			)
		);
	};

	return players.positions ? (
		<div>
			<AddFromSelect
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
				error={
					stacking.POSITION && !stacking.POSITION.NUMBER_OF_POSITIONS
						? 'Field cannot remain empty'
						: undefined
				}
				onAdd={handleAddPosition}
				ref={positionsSelectRef}
			/>
		</div>
	) : (
		<></>
	);
};

export default StackingSetting;
