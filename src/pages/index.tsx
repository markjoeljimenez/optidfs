import { connect } from 'react-redux';

import { initializeStore } from '../store';

import { post } from '../scripts/utilities/fetch';

import { SET_CONTESTS } from '../containers/Dropdown/Dropdown.actions';
import { setSport } from '../containers/Header/Header.actions';
import Bar from '../containers/Bar/Bar';
import Dropdown from '../containers/Dropdown/Dropdown';
import GameListing from '../components/gameListing';
import Rules from '../containers/Rules/Rules';
import Table from '../containers/Table/Table';

import sports from '../data/sports';

const API = process.env.ENDPOINT;

const App = ({ activeTab }: any) => (
	<>
		{/* <div className="border-b border-gray-300 bg-gray-100">
				<div className="container mx-auto p-8">
					<h2 className="text-xs uppercase font-black">
						Today&apos;s games
					</h2>
					<GameListing />
				</div>
			</div> */}
		<div className="border-b border-gray-300">
			<div className="container mx-auto p-8">
				<Dropdown />
				<Bar />
			</div>
		</div>
		<div
			className="mb-8"
			role="tabpanel"
			aria-labelledby="panel-players"
			hidden={activeTab !== 'players'}
		>
			<Table />
		</div>
		<div
			className="mb-8"
			role="tabpanel"
			aria-labelledby="panel-settings"
			hidden={activeTab !== 'settings'}
		>
			<Rules />
		</div>
	</>
);

export const getServerSideProps = async () => {
	if (!API) {
		return null;
	}

	const DEFAULT_SPORT = sports[0];

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

const mapStateToProps = ({ tabs }) => ({
	activeTab: tabs.activeTab,
});

export default connect(mapStateToProps)(App);
