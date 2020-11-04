import { connect } from 'react-redux';
import clsx from 'clsx';

import Search from '../Search/Search';
import Optimize from '../Optimize/Optimize';
import Chevron from '../../components/global/chevron';
import { openModal } from '../Rules/Rules.actions';
import Tabs from '../Tabs/Tabs';

const BarContainer = (props: any) => {
	const { players, active, activeTab } = props;

	// const handleRuleClick = () => {
	// 	props.openModal(!active);
	// };

	return players ? (
		// <div className="flex items-center justify-between mt-6 fixed inset-x-0 bottom-0 md:relative bg-white md:bg-transparent z-10 border-t border-gray-300 md:border-transparent">
		<div className="flex flex-col md:flex-row items-center justify-between">
			<div className="order-2 md:order-1">
				<Tabs />
			</div>
			<div className="flex order-1 md:order-2">
				<div className="mr-4">
					<Search />
				</div>
				<Optimize />
			</div>
		</div>
	) : (
		<></>
	);
};

const mapStateToProps = ({ table, rules }) => ({
	players: table.players,
	active: rules.active,
});

const mapDispatchToProps = (dispatch) => ({
	openModal: (value) => dispatch(openModal(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BarContainer);
