import { IconFileExport } from '@tabler/icons';
import { CSVLink } from 'react-csv';
import { useAppSelector } from 'src/hooks';

import { useGetOptimizedLineupsMutationResponse } from '@/containers/Optimize';

import { mapPlayersToDraftkingsCSV } from '../services/mapPlayersToCSV';

const Export = () => {
	const { providers } = useAppSelector((state) => state);
	const [_getOptimizedLineupsMutation, optimizeResponse] =
		useGetOptimizedLineupsMutationResponse();
	const data = mapPlayersToDraftkingsCSV(optimizeResponse.data)!;

	if (data) {
		return (
			<CSVLink
				className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				data={data}
				filename={providers.provider!}
			>
				<IconFileExport className="mr-2" stroke="currentColor" />
				Export
			</CSVLink>
		);
	}

	return <></>;
};

export default Export;
