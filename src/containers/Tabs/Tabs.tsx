import { connect } from 'react-redux';
import clsx from 'clsx';
import setActiveTabAction from './Tabs.actions';

const TABS = (sport) => [
	{
		name: 'Players',
		id: 'players',
	},
	{
		name: 'Stacking',
		id: 'stacking',
		disabled: sport === 4,
	},
	{
		name: 'Settings',
		id: 'settings',
	},
];

interface ITabsProps {
	activeTab: string;
	sport: number;
	setActiveTab(value): void;
	gameType: string;
}

const TabsContainer = ({
	activeTab,
	gameType,
	sport,
	setActiveTab,
}: ITabsProps) => {
	// const handleClick = () => {
	// 	props.optimizeLineups(props.value);
	// };

	function handleTabClick(e: React.MouseEvent<HTMLButtonElement>) {
		const { value } = e.currentTarget;

		setActiveTab(value);
	}

	// function handleSeeAllPlayers() {}

	return (
		<div className="flex justify-between">
			<nav>
				<ul className="flex" role="tablist">
					{TABS(sport).map(({ name, id }) => (
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

const mapStateToProps = ({ tabs, table, sports }) => ({
	activeTab: tabs.activeTab,
	sport: sports.sport,
	gameType: table.gameType,
});

const mapDispatchToProps = (dispatch) => ({
	setActiveTab: (value) => dispatch(setActiveTabAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabsContainer);
