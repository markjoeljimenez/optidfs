import { connect } from 'react-redux';

import { initializeStore, wrapper } from '../store';
import { SET_SPORTS } from '../containers/Sports/Sports.actions';
import { IDraftKingsPlayer } from '../interfaces/IDraftKingsResponse';
import { ISports } from '../interfaces/ISports';

import Bar from '../containers/Bar/Bar';
import Rules from '../containers/Rules/Rules';
import Stacking from '../containers/Stacking/Stacking';
import Table from '../containers/Table/Table.component';
import Tabs from '../containers/Tabs/Tabs';

import Loading from '../components/loading';
import { useAppSelector } from '../hooks';

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

const Index = () => {
	const test = useAppSelector((state) => state);

	return (
		<p>test</p>
		// <Loading loading={loading.isLoading} message={loading.message}>
		// 	{providers && sport && players?.length ? (
		// 		<>
		// 			<div>
		// 				<div className="container mx-auto p-8">
		// 					<Bar />
		// 				</div>
		// 			</div>
		// 			<div className="border-b border-gray-300">
		// 				<div className="container mx-auto px-8">
		// 					<Tabs />
		// 				</div>
		// 			</div>
		// 		</>
		// 	) : (
		// 		<></>
		// 	)}
		// 	{PANELS.map(({ id, element }) => (
		// 		<div
		// 			className="mb-8"
		// 			role="tabpanel"
		// 			aria-labelledby={`panel-${id}`}
		// 			hidden={activeTab !== id}
		// 			key={id}
		// 		>
		// 			{element}
		// 		</div>
		// 	))}
		// </Loading>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	async ({ store }) => {
		if (!API) {
			return null;
		}

		const { dispatch, getState } = store;

		const response = await fetch(API);
		const sports: ISports[] = await response.json();

		dispatch({
			type: SET_SPORTS,
			allSports: sports,
		});

		// dispatch({
		// 	type: FETCH_CONTESTS,
		// 	sport: sports[0].sportId,
		// });

		return { props: { initialReduxState: getState() } };
	}
);

export default Index;
