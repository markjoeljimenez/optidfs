import { initializeStore } from '../store';
import { SET_CONTESTS } from '../containers/Dropdown/Dropdown.actions';
import Dropdown from '../containers/Dropdown/Dropdown';
import Panel from '../templates/panel';
import Table from '../containers/Table/Table';
import Optimize from '../containers/Optimize/Optimize';

const API = process.env.ENDPOINT;

const App = ({ initialReduxState }: any) => (
	<Panel>
		<div className="form__row row">
			<div className="form__col form__col--inline col">
				<Dropdown />

				<div className="form__bar">
					<Optimize />
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
