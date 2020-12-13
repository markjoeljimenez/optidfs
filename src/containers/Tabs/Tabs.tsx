import { connect } from 'react-redux';
import clsx from 'clsx';
import setActiveTab from './Tabs.actions';

const TAB_DATA = [
	{
		name: 'Players',
		id: 'players',
	},
	// {
	// 	name: 'Team Stacking',
	// 	id: 'team-stacking',
	// },
	{
		name: 'Settings',
		id: 'settings',
	},
];

const TabsContainer = (props: any) => {
	// const handleClick = () => {
	// 	props.optimizeLineups(props.value);
	// };

	const { activeTab, optimizedPlayers } = props;

	function handleTabClick(e: React.MouseEvent<HTMLButtonElement>) {
		const { value } = e.currentTarget;

		props.setActiveTab(value);
	}

	function handleSeeAllPlayers() {}

	return (
		<nav>
			<ul className="flex" role="tablist">
				{TAB_DATA.map(({ name, id }) => (
					<li
						role="tab"
						aria-selected={activeTab === id}
						aria-controls={`panel-${name}`}
					>
						<button
							className={clsx(
								'py-2 px-4 font-black text-blue-600',
								activeTab === id
									? 'border-b-2 border-blue-900 text-blue-900'
									: ''
							)}
							type="button"
							onClick={handleTabClick}
							value={id}
						>
							{name}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

const mapStateToProps = ({ tabs, table }) => ({
	activeTab: tabs.activeTab,
	optimizedPlayers: table.optimizedPlayers,
});

const mapDispatchToProps = (dispatch) => ({
	setActiveTab: (value) => dispatch(setActiveTab(value)),
	seeAllPlayers: (value) => dispatch(setActiveTab(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabsContainer);
