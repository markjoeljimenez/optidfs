import Input from '../../../components/form/input';
import { useAppDispatch } from '../../../hooks';
import { IPlayer } from '../../../interfaces/IPlayer';

import {
	setPlayerExposure,
	setProjectedOwnership,
} from '../../Players/Players.actions';

interface ITableSubRow {
	player: IPlayer;
}

const TableSubRow = ({ player }: ITableSubRow) => {
	const dispatch = useAppDispatch();

	function handleExposureChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { value } = e.currentTarget;
		const id = e.currentTarget.getAttribute('data-player-id');

		if (id) {
			dispatch(setPlayerExposure(id, parseFloat(value)));
		}
	}

	function handleProjectedOwnershipChange(
		e: React.ChangeEvent<HTMLInputElement>
	) {
		const { value } = e.currentTarget;
		const id = e.currentTarget.getAttribute('data-player-id');

		if (id) {
			dispatch(setProjectedOwnership(id, parseFloat(value)));
		}
	}

	return (
		<div className="flex">
			<div className="w-1/4">
				<Input
					defaultValue={player.minExposure}
					id={`set-exposure-${player.id}`}
					label="Minimum exposure"
					max={1}
					min={0.1}
					onChange={handleExposureChange}
					step={0.1}
					type="number"
					data={{
						'data-player-id': player.id,
					}}
				/>
			</div>
			<div className="w-1/4 ml-8">
				<Input
					defaultValue={player.projectedOwnership}
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
			</div>
		</div>
	);
};

export default TableSubRow;
