import { wrapper } from '../store';
import { SET_SPORTS } from '../containers/Sports/Sports.actions';
import { ISports } from '../interfaces/ISports';

import Bar from '../containers/Bar/Bar';
import Rules from '../containers/Rules/Rules';
import Stacking from '../containers/Stacking/Stacking';
import Table from '../containers/Table/components/Table';
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
	const { dropdown, sports, table, tabs } = useAppSelector((state) => state);

	return (
		<Loading
			loading={dropdown.loading}
			message="Loading contests... this may take some time"
		>
			{sports.selectedSport && table.players?.length ? (
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
					hidden={tabs.activeTab !== id}
					key={id}
				>
					{element}
				</div>
			))}
		</Loading>
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

		return { props: { initialReduxState: getState() } };
	}
);

export default Index;
