import { IconFileExport } from '@tabler/icons';
import { useEffect } from 'react';
import { CSVLink } from 'react-csv';
import toast from 'react-hot-toast';
import { useAppSelector } from 'src/hooks';

import { useGetOptimizedLineupsMutationResponse } from '@/containers/Optimize';
import { EProviders } from '@/containers/Providers';

import {
	mapPlayersToDraftkingsCSV,
	mapPlayersToYahooCSV,
} from '../services/mapPlayersToCSV';

const exportMap = new Map([
	[EProviders.DraftKings, mapPlayersToDraftkingsCSV],
	[EProviders.Yahoo, mapPlayersToYahooCSV],
]);

const Export = () => {
	const { contests, providers } = useAppSelector((state) => state);
	const [_getOptimizedLineupsMutation, optimizeResponse] =
		useGetOptimizedLineupsMutationResponse();

	const data = exportMap.get(providers.provider!)!(
		optimizeResponse.data,
		contests.selectedContest!
	);

	function handleExportClick() {
		if (providers.provider === EProviders.Yahoo) {
			toast("For Yahoo contests, you'll need to provide your entry ID");
		}
	}

	if (data) {
		return (
			<CSVLink
				className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				data={data}
				filename={`optidfs-${providers.provider!}`}
				onClick={handleExportClick}
			>
				<IconFileExport className="mr-2" stroke="currentColor" />
				Export
			</CSVLink>
		);
	}

	return <></>;
};

export default Export;
