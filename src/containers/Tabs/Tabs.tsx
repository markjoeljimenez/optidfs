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

const TabsContainer = ({
	activeTab,
	optimizedPlayers,
	setActiveTabAction,
	gameType,
}: any) => {
	// const handleClick = () => {
	// 	props.optimizeLineups(props.value);
	// };

	function handleTabClick(e: React.MouseEvent<HTMLButtonElement>) {
		const { value } = e.currentTarget;

		setActiveTabAction(value);
	}

	// function handleSeeAllPlayers() {}

	return (
		<div className="flex justify-between">
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
			<p className="py-2 px-4 font-black text-blue-900 whitespace-no-wrap overflow-hidden truncate">
				{gameType}
			</p>
		</div>
	);
};

const mapStateToProps = ({ tabs, table }) => ({
	activeTab: tabs.activeTab,
	optimizedPlayers: table.optimizedPlayers,
	gameType: table.gameType,
});

const mapDispatchToProps = (dispatch) => ({
	setActiveTabAction: (value) => dispatch(setActiveTab(value)),
	seeAllPlayers: (value) => dispatch(setActiveTab(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabsContainer);
