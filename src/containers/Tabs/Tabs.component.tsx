import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../../hooks';
import Optimize from '../Optimize/Optimize.component';
import { setActiveTab } from './Tabs.actions';

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
