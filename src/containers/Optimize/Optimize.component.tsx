import { useAppDispatch, useAppSelector } from '../../hooks';
import {
	setActiveStackingTab,
	STACKING_TYPE,
} from '../Stacking/Stacking.actions';
import { setActiveTab } from '../Tabs/Tabs.actions';
import { optimize } from './Optimize.actions';

interface IOptimizeProps {
	disabled?: boolean;
}

const Optimize = ({ disabled }: IOptimizeProps) => {
	const dispatch = useAppDispatch();
	// TODO: Undo this
	// const { stacking } = useAppSelector((state) => state);
	const stacking = {} as any;

	function handleClick() {
		if (
			stacking &&
			stacking.TEAM &&
			!stacking.TEAM?.NUMBER_OF_PLAYERS_TO_STACK
		) {
			dispatch(setActiveTab('stacking'));
			dispatch(setActiveStackingTab(STACKING_TYPE.TEAM));

			return;
		}

		if (
			stacking &&
			stacking.POSITION &&
			!stacking.POSITION?.NUMBER_OF_POSITIONS
		) {
			dispatch(setActiveTab('stacking'));
			dispatch(setActiveStackingTab(STACKING_TYPE.POSITION));

			return;
		}

		dispatch(optimize());
		dispatch(setActiveTab('players'));
	}

	return (
		<button
			className="px-4 py-3 bg-indigo-700 text-white rounded shadow font-black hover:bg-indigo-800"
			disabled={disabled}
			type="button"
			onClick={handleClick}
		>
			Optimize
		</button>
	);
};

export default Optimize;
