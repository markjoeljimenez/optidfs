import clsx from 'clsx';
import { useFlags } from 'flagsmith/react';
import { useAppSelector } from 'src/hooks';

const TableFooterOptimize = () => {
	const { optimize, table } = useAppSelector((state) => state);
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
				<strong>
					{optimize.optimizedLineups![table.view as number].salary}
				</strong>
			</div>
			<div className="p-4 whitespace-nowrap text-right" role="cell">
				<strong>
					{optimize.optimizedLineups![table.view as number].fppg}
				</strong>
			</div>
		</div>
	);
};

export default TableFooterOptimize;
