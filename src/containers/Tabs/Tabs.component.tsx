import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { setActiveTab } from './Tabs.actions';
import { setView } from '../Table/Table.actions';
import Optimize from '../Optimize/Optimize.component';

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
	const { tabs, table, players } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	function handleTabClick(e: React.MouseEvent<HTMLButtonElement>) {
		const { value } = e.currentTarget;

		dispatch(setActiveTab(value));
	}

	function handleViewAllPlayers() {
		dispatch(setView('all'));
	}

	function handleViewOptimizedLineups() {
		dispatch(setView('optimized'));
	}

	return (
		<div className="flex relative justify-between">
			{/* {players.optimized?.length && (
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
			)} */}
			<nav>
				<ul className="flex space-x-2" role="tablist">
					{TABS.map(({ name, id }) => (
						<li
							role="tab"
							aria-selected={tabs.activeTab === id}
							aria-controls={`panel-${name}`}
							key={id}
						>
							<button
								className={clsx(
									'p-2',
									'font-medium',
									'rounded',
									tabs.activeTab === id ? 'bg-gray-100' : ''
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
			<Optimize />
		</div>
	);
};

export default Tabs;
