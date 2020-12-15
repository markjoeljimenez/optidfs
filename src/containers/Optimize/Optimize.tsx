import { connect } from 'react-redux';

import { optimize } from './Optimize.actions';
import setActiveTab from '../Tabs/Tabs.actions';
import {
	setActiveTab as setActiveStackingTab,
	STACKING_TYPE,
} from '../Stacking/Stacking.actions';
import { IError } from '../Error/Error';
import { ERROR_STATUSES } from '../../components/error';

interface IOptimizeProps {
	stacking: any;
	error: null | IError;
	optimizeLineups(): void;
	setActiveTabAction(tab: string): void;
	setActiveStackingTabAction(tab: string): void;
}

const Optimize = ({
	stacking,
	error,
	optimizeLineups,
	setActiveTabAction,
	setActiveStackingTabAction,
}: IOptimizeProps) => {
	const handleClick = () => {
		if (
			stacking &&
			stacking.POSITION &&
			!stacking.POSITION?.NUMBER_OF_POSITIONS
		) {
			console.log(stacking);
			setActiveTabAction('stacking');
			setActiveStackingTabAction(STACKING_TYPE.POSITION);

			return;
		}

		if (
			stacking &&
			stacking.TEAM &&
			!stacking.TEAM?.NUMBER_OF_PLAYERS_TO_STACK
		) {
			setActiveTabAction('stacking');
			setActiveStackingTabAction(STACKING_TYPE.TEAM);

			return;
		}

		optimizeLineups();
		setActiveTabAction('players');
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

const mapStateToProps = ({ error, stacking }) => ({
	error,
	stacking,
});

const mapDispatchToProps = (dispatch) => ({
	optimizeLineups: () => dispatch(optimize()),
	setActiveTabAction: (value) => dispatch(setActiveTab(value)),
	setActiveStackingTabAction: (value) =>
		dispatch(setActiveStackingTab(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Optimize);
