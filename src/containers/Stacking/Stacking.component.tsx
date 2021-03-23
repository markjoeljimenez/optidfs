import clsx from 'clsx';
import { MouseEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';

import {
	resetSettings,
	setActiveStackingTab,
	STACKING_TYPE,
} from './Stacking.actions';

import TeamStacking from './components/Team/Stacking.team';
import PositionStacking from './components/Position/Stacking.position';
import CustomStacking from './components/Custom/Stacking.custom';

export const TABS = [
	{
		id: STACKING_TYPE.TEAM,
		name: 'Team Stacking',
		children: <TeamStacking />,
	},
	{
		id: STACKING_TYPE.POSITION,
		name: 'Position Stacking',
		children: <PositionStacking />,
	},
	{
		id: STACKING_TYPE.CUSTOM,
		name: 'Custom Stacking',
		children: <CustomStacking />,
	},
];

const Stacking = () => {
	const dispatch = useAppDispatch();
	const { stacking } = useAppSelector((state) => state);

	const forms = useRef<(HTMLFormElement | null)[]>([]);

	function handleTabClick(e: MouseEvent<HTMLButtonElement>) {
		const { value } = e.currentTarget;

		dispatch(setActiveStackingTab(value));
	}

	function handleResetSettings() {
		forms.current.forEach((form) => {
			if (form) {
				form.reset();
			}
		});

		dispatch(resetSettings());
	}

	return (
		<div className="container mx-auto px-8 my-8">
			<div className="flex justify-between">
				<nav>
					<ul className="flex" role="tablist">
						{TABS.map(({ id, name }) => (
							<li
								role="tab"
								aria-selected={stacking.activeTab === id}
								aria-controls={`panel-${name}`}
								key={id}
							>
								<button
									className={clsx(
										'py-2 px-4 font-black text-blue-600',
										stacking.activeTab === id
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
				<button
					className="py-2 px-5 bg-blue-200 rounded text-blue-900 font-black hover:bg-blue-800 hover:text-white"
					type="button"
					onClick={handleResetSettings}
				>
					Reset Settings
				</button>
			</div>

			{TABS.map(({ id, children }) => (
				<div
					className="my-8"
					role="tabpanel"
					aria-labelledby={`panel-${id}`}
					hidden={stacking.activeTab !== id}
					key={id}
				>
					<form
						ref={(ref) => forms.current.push(ref)}
						onSubmit={(e) => e.preventDefault()}
					>
						{children}
					</form>
				</div>
			))}
		</div>
	);
};

export default Stacking;
