import { connect } from 'react-redux';
import clsx from 'clsx';
import setActiveTab from './Tabs.actions';

const TabsContainer = (props: any) => {
	// const handleClick = () => {
	// 	props.optimizeLineups(props.value);
	// };

	const { activeTab } = props;

	function handleTabClick(e: React.MouseEvent<HTMLButtonElement>) {
		const { value } = e.currentTarget;

		props.setActiveTab(value);
	}

	return (
		<nav>
			<ul className="flex" role="tablist">
				<li
					role="tab"
					aria-selected={activeTab === 'players'}
					aria-controls="panel-players"
				>
					<button
						className={clsx(
							'py-2 px-4 rounded font-black text-blue-600',
							activeTab === 'players'
								? 'bg-blue-200 text-blue-900'
								: ''
						)}
						type="button"
						onClick={handleTabClick}
						value="players"
					>
						Players
					</button>
				</li>
				<li
					role="tab"
					aria-selected={activeTab === 'settings'}
					aria-controls="panel-settings"
				>
					<button
						className={clsx(
							'py-2 px-4 rounded font-black text-blue-600',
							activeTab === 'settings'
								? 'bg-blue-200 text-blue-900'
								: ''
						)}
						type="button"
						onClick={handleTabClick}
						value="settings"
					>
						Settings
					</button>
				</li>
			</ul>
		</nav>
	);
};

const mapStateToProps = ({ tabs }) => ({
	activeTab: tabs.activeTab,
});

const mapDispatchToProps = (dispatch) => ({
	setActiveTab: (value) => dispatch(setActiveTab(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabsContainer);
