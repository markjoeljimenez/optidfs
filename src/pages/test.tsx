import Dropdown from '../containers/Dropdown/Dropdown';
import { initializeStore } from '../store';
import Table from '../containers/Table/Table';

const API = process.env.ENDPOINT;

const App = () => (
	<>
		<Dropdown />
		<Table />
	</>
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
		type: 'SET_CONTESTS',
		contests,
	});

	return { props: { initialReduxState: reduxStore.getState() } };
};

export default App;
