import clsx from 'clsx';
import { MouseEvent, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import CustomStacking from './components/Custom/Stacking.custom';
import PositionStacking from './components/Position/Stacking.position';
import TeamStacking from './components/Team/Stacking.team';
import {
	resetSettings,
	setActiveStackingTab,
	STACKING_TYPE,
} from './Stacking.actions';

export const TABS = [
	{
		children: <TeamStacking />,
		id: STACKING_TYPE.TEAM,
		name: 'Team Stacking',
	},
	{
		children: <PositionStacking />,
		id: STACKING_TYPE.POSITION,
		name: 'Position Stacking',
	},
	{
		children: <CustomStacking />,
		id: STACKING_TYPE.CUSTOM,
		name: 'Custom Stacking',
	},
];

const Stacking = () => {
	const dispatch = useAppDispatch();
	// const { stacking } = useAppSelector((state) => state);

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
		<div className="p-8 flex">
			<div>
				{/* <nav>
					<ul className="" role="tablist">
						{TABS.map(({ id, name }) => (
							<li
								role="tab"
								aria-selected={stacking.activeTab === id}
								aria-controls={`panel-${name}`}
								key={id}
							>
								<button
									className={clsx(
										'p-2 font-medium rounded w-full text-left pr-14',
										stacking.activeTab === id
											? 'bg-gray-100'
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
				</nav> */}
				<button
					className="px-4 py-3 bg-indigo-700 text-white rounded shadow font-black hover:bg-indigo-800 mt-6"
					type="button"
					onClick={handleResetSettings}
				>
					Reset Settings
				</button>
			</div>

			{/* {TABS.map(({ id, children }) => (
				<div
					className="flex-1 ml-8"
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
			))} */}
		</div>
	);
};

export default Stacking;
