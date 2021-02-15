import { connect } from 'react-redux';

import { initializeStore } from '../store';
import { SET_SPORTS } from '../containers/Sports/Sports.actions';
import { ISports } from '../interfaces/ISports';

import Bar from '../containers/Bar/Bar';
import Rules from '../containers/Rules/Rules';
import Stacking from '../containers/Stacking/Stacking';
import Table from '../containers/Table/Table';
import Tabs from '../containers/Tabs/Tabs';

import Loading from '../components/loading';

const API = process.env.ENDPOINT;
const PANELS = [
	{
		id: 'settings',
		element: <Rules />,
	},
	{
		id: 'players',
		element: <Table />,
	},
	{
		id: 'stacking',
		element: <Stacking />,
	},
];

const App = ({ activeTab, providers, sport, loading, players }: any) => (
	<Loading loading={loading.isLoading} message={loading.message}>
		{providers && sport && players?.length ? (
			<>
				<div>
					<div className="container mx-auto p-8">
						<Bar />
					</div>
				</div>
				<div className="border-b border-gray-300">
					<div className="container mx-auto px-8">
						<Tabs />
					</div>
				</div>
			</>
		) : (
			<></>
		)}
		{PANELS.map(({ id, element }) => (
			<div
				className="mb-8"
				role="tabpanel"
				aria-labelledby={`panel-${id}`}
				hidden={activeTab !== id}
				key={id}
			>
				{element}
			</div>
		))}
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
