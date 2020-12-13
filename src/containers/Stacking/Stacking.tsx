import clsx from 'clsx';
import { MouseEvent, useState } from 'react';
import { connect } from 'react-redux';

import NumberOfPlayersToStack from './Stacking.team.players';
import FromTeams from './Stacking.team.teams';
import FromPositions from './Stacking.team.positions';
import Spacing from './Stacking.team.spacing';
import MaxExposure from './Stacking.team.maxExposure';
import MaxExposurePerTeam from './Stacking.team.maxExposurePerTeam';

import Positions from './Stacking.position.positions';

import { resetSettings } from './Stacking.actions';

const TABS = [
	{
		id: 'team',
		name: 'Team Stacking',
		children: (
			<>
				<NumberOfPlayersToStack />
				<FromTeams />
				<FromPositions />
				<Spacing />
				<MaxExposure />
				<MaxExposurePerTeam />
			</>
		),
	},
	{
		id: 'position',
		name: 'Position Stacking',
		children: (
			<>
				<Positions />
			</>
		),
	},
];

interface IStackingContainerProps {
	resetSettingsAction(): void;
}

const StackingContainer = ({
	resetSettingsAction,
}: IStackingContainerProps) => {
	const [activeTab, setActiveTab] = useState<string>(TABS[0].id);

	function handleTabClick(e: MouseEvent<HTMLButtonElement>) {
		const { value } = e.currentTarget;

		setActiveTab(value);
	}

	function handleResetSettings(e: MouseEvent<HTMLButtonElement>) {
		resetSettingsAction();
	}

	return (
		<div className="container mx-auto px-8 my-8">
			<div className="flex justify-between">
				<nav>
					<ul className="flex" role="tablist">
						{TABS.map(({ id, name }) => (
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
					hidden={activeTab !== id}
					key={id}
				>
					{children}
				</div>
			))}
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	resetSettingsAction: () => dispatch(resetSettings()),
});

export default connect(null, mapDispatchToProps)(StackingContainer);
