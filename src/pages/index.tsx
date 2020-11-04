import { connect } from 'react-redux';

import { initializeStore } from '../store';

import { post } from '../scripts/utilities/fetch';

import {
	FETCH_CONTESTS,
	SET_CONTESTS,
} from '../containers/Dropdown/Dropdown.actions';
import Bar from '../containers/Bar/Bar';
import Dropdown from '../containers/Dropdown/Dropdown';
import GameListing from '../components/gameListing';
import Rules from '../containers/Rules/Rules';
import Table from '../containers/Table/Table';

import Upload from '../containers/Upload/Upload';
import { SET_SPORTS } from '../containers/Sports/Sports.actions';
import { ISports } from '../interfaces/ISports';
import Loading from '../components/loading';

const API = process.env.ENDPOINT;

const App = ({ activeTab, providers, sport, loading, players }: any) => (
	<Loading loading={loading.isLoading} message={loading.message}>
		{/* <div className="border-b border-gray-300 bg-gray-100">
				<div className="container mx-auto p-8">
					<h2 className="text-xs uppercase font-black">
						Today&apos;s games
					</h2>
					<GameListing />
				</div>
			</div> */}
		{/* {sport ? (
			<div className="border-b border-gray-300">
				<div className="container mx-auto p-8">
					<Dropdown />
					<Bar />
				</div>
			</div>
		) : (
			<div className="container mx-auto p-8">
				<p>First select a sport</p>
			</div>
		)} */}
		{providers && sport && players?.length ? (
			<div className="border-b border-gray-300">
				<div className="container mx-auto p-8">
					{/* <Dropdown /> */}
					<Bar />
				</div>
			</div>
		) : (
			<></>
		)}
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
	</Loading>
);

export const getServerSideProps = async () => {
	if (!API) {
		return null;
	}

	const reduxStore = initializeStore();
	const { dispatch } = reduxStore;

	const response = await fetch(API);
	const sports: ISports[] = await response.json();

	dispatch({
		type: SET_SPORTS,
		sports,
	});

	// dispatch({
	// 	type: FETCH_CONTESTS,
	// 	sport: sports[0].sportId,
	// });

	return { props: { initialReduxState: reduxStore.getState() } };
};

const mapStateToProps = ({ tabs, sports, dropdown, providers, table }) => ({
	activeTab: tabs.activeTab,
	players: table.players,
	providers,
	sport: sports.sport,
	loading: {
		isLoading: dropdown.loading,
		message: dropdown.message,
	},
});

export default connect(mapStateToProps)(App);
