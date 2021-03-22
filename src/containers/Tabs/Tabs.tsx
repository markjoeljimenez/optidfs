import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { setActiveTab } from './Tabs.actions';
import { setView } from '../Table/Table.actions';

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

const Tabs = () => {
	const { tabs, table, players, contests } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const { value } = e.currentTarget;

		dispatch(setActiveTab(value));
	};

	const handleViewAllPlayers = () => {
		dispatch(setView('all'));
	};

	const handleViewOptimizedLineups = () => {
		dispatch(setView('optimized'));
	};

	return (
		<div className="flex relative justify-center">
			{players.optimized?.length && (
				<div className="absolute inset-y-0 left-0 p-2">
					{table.view === 'all' ? (
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
							aria-selected={tabs.activeTab === id}
							aria-controls={`panel-${name}`}
							key={id}
						>
							<button
								className={clsx(
									'py-2 px-4 font-black text-blue-600',
									tabs.activeTab === id
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
				Game type: {contests.gameType}
			</p>
		</div>
	);
};

export default Tabs;
