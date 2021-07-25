import { wrapper } from '../store';
import { useAppSelector } from '../hooks';

import { SET_SPORTS } from '../containers/Sports/Sports.actions';
import { ISports } from '../interfaces/ISports';

import Bar from '../containers/Bar/Bar.component';
import Rules from '../containers/Rules/Rules.component';
import Stacking from '../containers/Stacking/Stacking.component';
import Table from '../containers/Table/Table.component';
import Tabs from '../containers/Tabs/Tabs.component';

import Dropdown from '../containers/Dropdown/Dropdown.component';
import Upload from '../containers/Upload/Upload.component';
import Optimize from '../containers/Optimize/Optimize.component';

import Loading from '../components/loading/loading';

const API = process.env.ENDPOINT;
const PANELS = [
	{
		id: 'players',
		element: <Table />,
	},
	{
		id: 'stacking',
		element: <Stacking />,
	},
	{
		id: 'settings',
		element: <Rules />,
	},
];

const Index = () => {
	const { contests, sports, table, tabs, players } = useAppSelector(
		(state) => state
	);

	return (
		<Loading
			loading={contests.loading}
			message="Loading contests... this may take some time"
		>
			<div className="md:flex justify-between p-8 pb-0 items-center">
				<h2>
					<strong className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
						Dashboard
					</strong>
				</h2>
				{sports.selectedSport && (
					<div className="flex space-x-4">
						<Dropdown />
						<Upload />
						<Optimize disabled={contests.contest === undefined} />
					</div>
				)}
			</div>

			{contests.contest && (
				<div className="p-8 pt-3">
					<Tabs />
				</div>
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
