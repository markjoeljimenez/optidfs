import { connect } from 'react-redux';

import { optimize } from './Optimize.actions';
import setActiveTab from '../Tabs/Tabs.actions';
import { setActiveTab as setActiveStackingTab } from '../Stacking/Stacking.actions';

interface IOptimizeProps {
	stackingError: any;
	optimizeLineups(): void;
	setActiveTabAction(tab: string): void;
	setActiveStackingTabAction(tab: string): void;
}

const Optimize = ({
	stackingError,
	optimizeLineups,
	setActiveTabAction,
	setActiveStackingTabAction,
}: IOptimizeProps) => {
	const handleClick = () => {
		console.log(stackingError);
		if (stackingError) {
			setActiveTabAction('stacking');
			setActiveStackingTabAction(stackingError.stackingType);

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

const mapStateToProps = ({ table, rules, stacking }) => ({
	draftGroupId: table.draftGroupId,
	value: rules.NUMBER_OF_GENERATIONS,
	stackingError: stacking.error,
});

const mapDispatchToProps = (dispatch) => ({
	optimizeLineups: () => dispatch(optimize()),
	setActiveTabAction: (value) => dispatch(setActiveTab(value)),
	setActiveStackingTabAction: (value) =>
		dispatch(setActiveStackingTab(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Optimize);
