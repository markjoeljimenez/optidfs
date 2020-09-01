import { initializeStore } from '../store';
import { SET_CONTESTS } from '../containers/Dropdown/Dropdown.actions';
import Panel from '../templates/panel';
import Table from '../containers/Table/Table';
import Bar from '../containers/Bar/Bar';
import Dropdown from '../containers/Dropdown/Dropdown';

const API = process.env.ENDPOINT;

const App = ({ initialReduxState }: any) => (
	<Panel>
		<div className="row">
			<div className="col">
				<div className="form__row row">
					<div className="form__col form__col--inline col">
						<Dropdown />
					</div>
				</div>
				<div className="form__row row">
					<div className="form__col form__col--inline col">
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

	const response = await fetch(API);
	const { contests } = await response.json();

	const reduxStore = initializeStore();
	const { dispatch } = reduxStore;

	dispatch({
		type: SET_CONTESTS,
		contests,
	});

	return { props: { initialReduxState: reduxStore.getState() } };
};

export default App;
