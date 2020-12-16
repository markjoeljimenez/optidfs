import { useRef, MouseEvent } from 'react';
import { connect } from 'react-redux';

import AddFromSelect from '../../components/form/addFromSelect';

import {
	removeFromSetting,
	setSetting,
	STACKING_POSITION_SETTINGS,
	STACKING_TYPE,
} from './Stacking.actions';

interface IStackingSetting {
	positions: string[];
	stacking: any;
	setStackingSetting(
		stackingType: string,
		setting: string,
		key: string | undefined,
		value: string[]
	): void;
	removeFromStackingSetting(
		stackingType: string,
		setting: string,
		key: string
	): void;
}

const StackingSetting = ({
	positions,
	stacking,
	setStackingSetting,
	removeFromStackingSetting,
}: IStackingSetting) => {
	const positionsSelectRef = useRef<HTMLSelectElement>(null);
	const currentPositions =
		stacking[STACKING_TYPE.POSITION]?.[
			STACKING_POSITION_SETTINGS.OPTIONAL_POSITIONS
		];

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

			setStackingSetting(
				STACKING_TYPE.POSITION,
				STACKING_POSITION_SETTINGS.OPTIONAL_POSITIONS,
				undefined,
				transformedPositions
			);
		}
	}

	function handleRemovePosition(e: MouseEvent<HTMLButtonElement>) {
		const { value } = e.currentTarget;

		removeFromStackingSetting(
			STACKING_TYPE.POSITION,
			STACKING_POSITION_SETTINGS.OPTIONAL_POSITIONS,
			value
		);
	}

	return (
		<div className="mt-8">
			<AddFromSelect
				select={{
					id: 'optionalPositions',
					items: positions,
					label: 'Optional Positions',
					placeholder: 'Select position',
				}}
				list={{
					items: currentPositions,
					onClick: handleRemovePosition,
					props: {
						'data-stacking-type': STACKING_TYPE.POSITION,
					},
				}}
				onAdd={handleAddPosition}
				ref={positionsSelectRef}
			/>
		</div>
	);
};

const mapStateToProps = ({ table, stacking }) => ({
	stacking,
	positions: table.positions,
});

const mapDispatchToProps = (dispatch) => ({
	setStackingSetting: (stackingType, setting, key, value) =>
		dispatch(setSetting(stackingType, setting, key, value)),
	removeFromStackingSetting: (stackingType, setting, key) =>
		dispatch(removeFromSetting(stackingType, setting, key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StackingSetting);
