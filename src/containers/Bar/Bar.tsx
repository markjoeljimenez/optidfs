import { connect } from 'react-redux';

import Search from '../Search/Search';
import Optimize from '../Optimize/Optimize';
import Chevron from '../../components/global/chevron';
import { openModal } from '../Rules/Rules.actions';

const BarContainer = (props: any) => {
	const { players, active } = props;

	const handleRuleClick = () => {
		props.openModal(!active);
	};

	return players ? (
		<div className="action-bar row">
			<div className="action-bar__container col">
				<Search />
				<div className="action-bar__rules">
					<button type="button" onClick={handleRuleClick}>
						Rules
						<Chevron active={active} />
					</button>
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
