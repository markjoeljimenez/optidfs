import { useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

import setActiveTabAction from './Tabs.actions';
import {
	viewAllPlayersAction,
	viewOptimizedLineupsAction,
} from '../Table/Table.actions';
import { IDraftKingsPlayer } from '../../interfaces/IDraftKingsResponse';

const TABS = [
	{
		name: 'Players',
		id: 'players',
	},
	{
		name: 'Stacking',
		id: 'stacking',
	},
	{
		name: 'Settings',
		id: 'settings',
	},
];

interface ITabsProps {
	activeTab: string;
	optimizedPlayers: IDraftKingsPlayer[];
	view: string;
	gameType: string;
	setActiveTab(value): void;
	viewAllPlayers(): void;
	viewOptimizedLineups(): void;
}

const TabsContainer = ({
	activeTab,
	gameType,
	view,
	optimizedPlayers,
	viewAllPlayers,
	viewOptimizedLineups,
	setActiveTab,
}: ITabsProps) => {
	console.log(view, optimizedPlayers);
	const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const { value } = e.currentTarget;

		setActiveTab(value);
	};

	const handleViewAllPlayers = () => {
		viewAllPlayers();
	};

	const handleViewOptimizedLineups = () => {
		viewOptimizedLineups();
	};

	return (
		<div className="flex relative justify-center">
			{optimizedPlayers?.length && (
				<div className="absolute inset-y-0 left-0 p-2">
					{view === 'all' ? (
						<button
							className="uppercase text-xs font-black text-blue-900"
							type="button"
							onClick={handleViewOptimizedLineups}
						>
							&lt; View Optimized Lineups
						</button>
					) : (
						<button
							className="uppercase text-xs font-black text-blue-900"
							type="button"
							onClick={handleViewAllPlayers}
						>
							&lt; View All Players
						</button>
					)}
				</div>
			)}
			<nav>
				<ul className="flex" role="tablist">
					{TABS.map(({ name, id }) => (
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
			<p className="p-2 uppercase text-xs font-black text-blue-900 whitespace-no-wrap overflow-hidden truncate absolute inset-y-0 right-0 flex items-center">
				Game type:
				{' '}
				{gameType}
			</p>
		</div>
	);
};

const mapStateToProps = ({ tabs, table, sports }) => ({
	activeTab: tabs.activeTab,
	sport: sports.sport,
	gameType: table.gameType,
	view: table.view,
	optimizedPlayers: table.optimizedPlayers,
});

const mapDispatchToProps = (dispatch) => ({
	setActiveTab: (value) => dispatch(setActiveTabAction(value)),
	viewAllPlayers: () => dispatch(viewAllPlayersAction()),
	viewOptimizedLineups: () => dispatch(viewOptimizedLineupsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabsContainer);
