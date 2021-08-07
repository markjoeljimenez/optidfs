import Input from '../../../components/form/input';
import { useAppDispatch } from '../../../hooks';
import { IDraftKingsPlayer } from '../../../interfaces/IDraftKingsResponse';

import {
	setPlayerExposure,
	setProjectedOwnership,
} from '../../Players/Players.actions';

interface ITableSubRow {
	player: IDraftKingsPlayer;
}

// TODO: Find better way to do this
const TableSubRow = ({ player }: ITableSubRow) => {
	const dispatch = useAppDispatch();

	function handleExposureChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { value } = e.currentTarget;
		const id = e.currentTarget.getAttribute('data-player-id');

		// if (id) {
		// 	dispatch(setPlayerExposure(id, parseFloat(value)));
		// }
	}

	// function handleProjectedOwnershipChange(
	// 	e: React.ChangeEvent<HTMLInputElement>
	// ) {
	// 	const { value } = e.currentTarget;
	// 	const id = e.currentTarget.getAttribute('data-player-id');

	// 	if (id) {
	// 		dispatch(setProjectedOwnership(id, parseFloat(value)));
	// 	}
	// }

	return (
		<div className="flex">
			<div className="w-1/4">
				<Input
					label="Minimum exposure"
					id={`set-exposure-${player.id}`}
					type="number"
					min={0.1}
					max={1}
					step={0.1}
					defaultValue={player.min_exposure}
					onChange={handleExposureChange}
					data={{
						'data-player-id': player.id,
					}}
				/>
			</div>
			{/* <div className="w-1/4 ml-8">
				<Input
					defaultValue={player.projected_ownership}
					id={`set-ownership-projection-${player.id}`}
					label="Projected Ownership"
					max={1}
					min={0.1}
					onChange={handleProjectedOwnershipChange}
					step={0.1}
					type="number"
					data={{
						'data-player-id': player.id,
					}}
				/>
			</div> */}
		</div>
	);
};

export default TableSubRow;
