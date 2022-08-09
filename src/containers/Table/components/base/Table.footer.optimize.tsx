import clsx from 'clsx';
import { useFlags } from 'flagsmith/react';
import { useAppSelector } from 'src/hooks';

import { useGetOptimizedLineupsMutationResponse } from '@/containers/Optimize';

const TableFooterOptimize = () => {
	const { table } = useAppSelector((state) => state);
	const [_getOptimizedLineups, optimizeResponse] =
		useGetOptimizedLineupsMutationResponse();

	return (
		<div
			className={clsx(
				'border-t border-gray-200 grid items-center',
				'grid-cols-table-md-stacking-ff'
			)}
			role="row"
		>
			<div className="p-4 whitespace-nowrap" role="cell">
				<strong>Total</strong>
			</div>
			<div className="p-4 whitespace-nowrap" role="cell"></div>
			<div className="p-4 whitespace-nowrap" role="cell"></div>
			<div className="p-4 whitespace-nowrap" role="cell"></div>
			<div className="p-4 whitespace-nowrap" role="cell"></div>
			<div className="p-4 whitespace-nowrap" role="cell"></div>
			<div className="p-4 whitespace-nowrap text-right" role="cell">
				<strong>
					{new Intl.NumberFormat('en-US', {
						currency: 'USD',
						minimumFractionDigits: 0,
						style: 'currency',
					}).format(
						optimizeResponse.data!.lineups[table.view as number]
							.salary
					)}
				</strong>
			</div>
			<div className="p-4 whitespace-nowrap text-right" role="cell">
				<strong>
					{optimizeResponse.data!.lineups[table.view as number].fppg}
				</strong>
			</div>
		</div>
	);
};

export default TableFooterOptimize;
