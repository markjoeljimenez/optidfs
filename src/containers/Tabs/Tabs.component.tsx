import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../../hooks';
import Optimize from '../Optimize/Optimize.component';
import { setActiveTab } from './Tabs.actions';

const TABS = [
	{
		id: 'players',
		name: 'Players',
	},
	{
		id: 'stacking',
		name: 'Stacking',
	},
	{
		id: 'settings',
		name: 'Settings',
	},
];

const Tabs = () => {
	const { tabs } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	function handleTabClick(e: React.MouseEvent<HTMLButtonElement>) {
		const { value } = e.currentTarget;

		dispatch(setActiveTab(value));
	}

	return (
		<div className="flex relative justify-between">
			<nav>
				<ul className="flex space-x-2" role="tablist">
					{TABS.map(({ id, name }) => (
						<li
							key={id}
							aria-controls={`panel-${name}`}
							aria-selected={tabs.activeTab === id}
							role="tab"
						>
							<button
								className={clsx(
									'p-2',
									'font-medium',
									'rounded',
									tabs.activeTab === id ? 'bg-gray-100' : ''
								)}
								type="button"
								value={id}
								onClick={handleTabClick}
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
