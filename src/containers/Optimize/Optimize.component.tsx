import { useAppDispatch, useAppSelector } from '../../hooks';

import { setActiveTab } from '../Tabs/Tabs.actions';
import {
	setActiveStackingTab,
	STACKING_TYPE,
} from '../Stacking/Stacking.actions';
import { optimize } from './Optimize.actions';

const Optimize = () => {
	const { stacking } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	const handleClick = () => {
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
	};

	return (
		<button
			className="py-2 px-5 bg-blue-200 text-blue-900 rounded-full font-black hover:bg-blue-800 hover:text-white"
			type="button"
			onClick={handleClick}
		>
			Optimize
		</button>
	);
};

// const mapStateToProps = ({ error, stacking }) => ({
// 	error,
// 	stacking,
// });

// const mapDispatchToProps = (dispatch) => ({
// 	optimizeLineups: () => dispatch(optimize()),
// 	setActiveTabAction: (value) => dispatch(setActiveTab(value)),
// 	setActiveStackingTabAction: (value) =>
// 		dispatch(setActiveStackingTab(value)),
// });

export default Optimize;
