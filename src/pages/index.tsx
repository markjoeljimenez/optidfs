import { initializeStore } from '../store';
import { SET_CONTESTS } from '../containers/Dropdown/Dropdown.actions';
import Panel from '../templates/panel';
import Table from '../containers/Table/Table';
import Bar from '../containers/Bar/Bar';
import Dropdown from '../containers/Dropdown/Dropdown';
import { post } from '../scripts/utilities/fetch';
import { setSport } from '../containers/Header/Header.actions';

const API = process.env.ENDPOINT;

const App = ({ initialReduxState }: any) => (
	<Panel>
		<div className="row">
			<div className="col">
				<div className="row">
					<div className="col">
						<Dropdown />
					</div>
				</div>
				<div className="row">
					<div className="col">
						<Bar />
					</div>
				</div>
			</div>
		</div>
		<div className="row">
			<div className="col">
				<Table />
			</div>
		</div>
	</Panel>
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
