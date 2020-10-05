import clsx from 'clsx';
import { useState } from 'react';
import { initializeStore } from '../store';
import { post } from '../scripts/utilities/fetch';
import { SET_CONTESTS } from '../containers/Dropdown/Dropdown.actions';
import { setSport } from '../containers/Header/Header.actions';
import Bar from '../containers/Bar/Bar';
import Dropdown from '../containers/Dropdown/Dropdown';
import Rules from '../containers/Rules/Rules';
import Table from '../containers/Table/Table';
import GameListing from '../components/gameListing';

const API = process.env.ENDPOINT;

const App = ({ initialReduxState }: any) => {
	const [activeTab, setActiveTab] = useState<string>('players');

	const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const { value } = e.currentTarget;

		setActiveTab(value);
	};

	return (
		<>
			<div className="border-b border-gray-300 bg-gray-200">
				<div className="container mx-auto p-8">
					<h2 className="text-xs uppercase font-black">
						Today&apos;s games
					</h2>
					<GameListing />
				</div>
			</div>
			<div className="border-b border-gray-300">
				<div className="container mx-auto p-8">
					<Dropdown />
					<div className="flex justify-between mt-6">
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
						<Bar />
					</div>
				</div>
			</div>
			<div
				role="tabpanel"
				aria-labelledby="panel-players"
				hidden={activeTab !== 'players'}
			>
				<Table />
			</div>
			<div
				role="tabpanel"
				aria-labelledby="panel-settings"
				hidden={activeTab !== 'settings'}
			>
				<Rules />
			</div>
		</>
	);
};

export const getServerSideProps = async () => {
	if (!API) {
		return null;
	}

	const DEFAULT_SPORT = 'NBA';

	const response = await post(API, {
		sport: DEFAULT_SPORT,
	});
	const { contests } = await response.json();

	const reduxStore = initializeStore();
	const { dispatch } = reduxStore;

	dispatch({
		type: SET_CONTESTS,
		contests,
		sport: DEFAULT_SPORT,
	});

	return { props: { initialReduxState: reduxStore.getState() } };
};

export default App;
