import clsx from 'clsx';
import { MouseEvent, useRef } from 'react';
import { connect } from 'react-redux';

import TeamStacking from './Team/Stacking.team';
import PositionStacking from './Position/Stacking.position';
import CustomStacking from './Custom/Stacking.custom';

import {
	resetSettings,
	setActiveStackingTab,
	STACKING_TYPE,
} from './Stacking.actions';

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

interface IStackingContainerProps {
	activeTab: string;
	resetSettingsAction(): void;
	setActiveTabAction(activeTab: string): void;
}

const StackingContainer = ({
	activeTab,
	resetSettingsAction,
	setActiveTabAction,
}: IStackingContainerProps) => {
	const forms = useRef<(HTMLFormElement | null)[]>([]);

	function handleTabClick(e: MouseEvent<HTMLButtonElement>) {
		const { value } = e.currentTarget;

		setActiveTabAction(value);
	}

	function handleResetSettings(e: MouseEvent<HTMLButtonElement>) {
		forms.current.forEach((form) => {
			if (form) {
				form.reset();
			}
		});

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

const mapStateToProps = ({ stacking }) => ({
	activeTab: stacking.activeTab,
});

const mapDispatchToProps = (dispatch) => ({
	resetSettingsAction: () => dispatch(resetSettings()),
	setActiveTabAction: (activeTab) =>
		dispatch(setActiveStackingTab(activeTab)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
	forwardRef: true,
})(StackingContainer);
