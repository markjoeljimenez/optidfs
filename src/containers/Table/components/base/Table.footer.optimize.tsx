import clsx from 'clsx';
import { useFlags } from 'flagsmith/react';
import { useAppSelector } from 'src/hooks';

import { optimizedState } from '@/containers/Optimize';

// interface ITableFooterOptimize {
// 	optimizedLineup: IOptimizedLineup;
// }

const TableFooterOptimize = () => {
	const { currentOptimizedLineup } = useAppSelector(optimizedState);
	const { stacking } = useFlags(['stacking']);

	return (
		<div
			className={clsx(
				'border-b border-gray-200 grid items-center',
				stacking.enabled
					? 'grid-cols-table-md-stacking-ff'
					: 'grid-cols-table-md'
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
				<strong>{currentOptimizedLineup!.salary}</strong>
			</div>
			<div className="p-4 whitespace-nowrap text-right" role="cell">
				<strong>{currentOptimizedLineup!.fppg}</strong>
			</div>
		</div>
	);
};

export default TableFooterOptimize;
