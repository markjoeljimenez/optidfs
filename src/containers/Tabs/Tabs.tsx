import { connect } from 'react-redux';
import clsx from 'clsx';
import setActiveTabAction from './Tabs.actions';

const TAB_DATA = (sport) => [
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
	optimizedPlayers: any;
	sport: number;
	setActiveTab(value): void;
}

const TabsContainer = ({
	activeTab,
	optimizedPlayers,
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
		<nav>
			<ul className="flex" role="tablist">
				{TAB_DATA(sport).map(
					({ name, id, disabled }) =>
						!disabled && (
							<li
								role="tab"
								aria-selected={activeTab === id}
								aria-controls={`panel-${name}`}
								key={id}
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
						)
				)}
			</ul>
		</nav>
	);
};

const mapStateToProps = ({ tabs, table, sports }) => ({
	activeTab: tabs.activeTab,
	optimizedPlayers: table.optimizedPlayers,
	sport: sports.sport,
});

const mapDispatchToProps = (dispatch) => ({
	setActiveTab: (value) => dispatch(setActiveTabAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabsContainer);
