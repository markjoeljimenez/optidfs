import { useAppSelector } from '../hooks';
// import { wrapper } from '../store';
import Dropdown from '../containers/Dropdown/Dropdown.component';
import Loading from '../components/loading/loading';
import Rules from '../containers/Rules/Rules.component';
import Stacking from '../containers/Stacking/Stacking.component';
import Table from '../containers/Table/Table.component';
import Tabs from '../containers/Tabs/Tabs.component';
import Upload from '../containers/Upload/Upload.component';
import { selectSports } from '../containers/Sports/Sports.reducers';
import { useGetPlayersQuery } from '../api';
import { useEffect } from 'react';
import { selectContests } from '../containers/Dropdown/Dropdown.reducers';
import { selectProviders } from '../containers/Providers/Providers.reducers';
import { skipToken } from '@reduxjs/toolkit/dist/query';

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
	const { selectedSport } = useAppSelector(selectSports);
	const { selectedContest } = useAppSelector(selectContests);
	const { provider } = useAppSelector(selectProviders);

	const { data } = useGetPlayersQuery(
		selectedContest
			? {
					id: selectedContest?.id!,
					provider: provider!,
			  }
			: skipToken
	);

	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		// <Loading
		// 	loading={contests.loading}
		// 	message="Loading contests... this may take some time"
		// >
		// 	<div className="md:flex justify-between p-8 pb-0 items-center">
		// 		<h2>
		// 			<strong className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
		// 				Dashboard
		// 			</strong>
		// 		</h2>
		// 		{sports.selectedSport && (
		// 			<div className="flex space-x-4">
		// 				<Dropdown />
		// 				<Upload />
		// 			</div>
		// 		)}
		// 	</div>

		// 	{contests.contest && (
		// 		<div className="p-8 pb-3 border-b border-gray-200 ">
		// 			<Tabs />
		// 		</div>
		// 	)}

		// 	{players.all ? (
		// 		PANELS.map(({ id, element }) => (
		// 			<div
		// 				role="tabpanel"
		// 				aria-labelledby={`panel-${id}`}
		// 				hidden={tabs.activeTab !== id}
		// 				key={id}
		// 			>
		// 				{element}
		// 			</div>
		// 		))
		// 	) : (
		// 		<></>
		// 	)}
		// </Loading>
		<div>
			<div className="md:flex justify-between p-8 pb-0 items-center">
				<h2>
					<strong className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
						Dashboard
					</strong>
				</h2>
				{selectedSport && (
					<div className="flex space-x-4">
						<Dropdown />
						<Upload />
					</div>
				)}
			</div>
			{/* {players ? (
				PANELS.map(({ id, element }) => (
					<div
						role="tabpanel"
						aria-labelledby={`panel-${id}`}
						// hidden={tabs.activeTab !== id}
						key={id}
					>
						{element}
					</div>
				))
			) : (
				<></>
			)} */}
		</div>
	);
};

// export const getServerSideProps = getServerSideProps(
// 	async ({ store }) => {
// 		if (!API) {
// 			return null;
// 		}

// 		const { getState } = store;

// 		return { props: { initialReduxState: getState() } };
// 	}
// );

export default Index;
