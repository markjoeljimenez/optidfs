import { useAppSelector } from '../hooks';
import { wrapper } from '../store';
import Dropdown from '../containers/Dropdown/Dropdown.component';
import Loading from '../components/loading/loading';
import Rules from '../containers/Rules/Rules.component';
import Stacking from '../containers/Stacking/Stacking.component';
import Table from '../containers/Table/Table.component';
import Tabs from '../containers/Tabs/Tabs.component';
import Upload from '../containers/Upload/Upload.component';

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
					</div>
				)}
			</div>

			{contests.contest && (
				<div className="p-8 pb-3 border-b border-gray-200 ">
					<Tabs />
				</div>
			)}

			{players.all ? (
				PANELS.map(({ id, element }) => (
					<div
						role="tabpanel"
						aria-labelledby={`panel-${id}`}
						hidden={tabs.activeTab !== id}
						key={id}
					>
						{element}
					</div>
				))
			) : (
				<></>
			)}
		</Loading>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	async ({ store }) => {
		if (!API) {
			return null;
		}

		const { getState } = store;

		return { props: { initialReduxState: getState() } };
	}
);

export default Index;
