import { initializeStore } from '../store';
import { post } from '../scripts/utilities/fetch';
import { SET_CONTESTS } from '../containers/Dropdown/Dropdown.actions';
import { setSport } from '../containers/Header/Header.actions';
import Bar from '../containers/Bar/Bar';
import Dropdown from '../containers/Dropdown/Dropdown';
import Panel from '../templates/panel';
import Rules from '../containers/Rules/Rules';
import Table from '../containers/Table/Table';

const API = process.env.ENDPOINT;

const App = ({ initialReduxState }: any) => (
	<>
		<div className="border-b border-gray-300">
			<div className="container mx-auto p-8">
				<h2 className="text-xs uppercase font-black">
					Today&apos;s games
				</h2>
			</div>
		</div>
		<div className="border-b border-gray-300">
			<div className="container mx-auto p-8">
				<Dropdown />
			</div>
		</div>
		{/* <Bar /> */}
		{/* <Rules /> */}
		<Table />
	</>
);

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
