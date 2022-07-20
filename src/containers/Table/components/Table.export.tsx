import clsx from 'clsx';

interface ITableExport {
	active?: boolean;
}

const TableExport = ({ active }: ITableExport) => (
	<a
		className={clsx(!active && 'pointer-events-none cursor-default')}
		download="DKSalaries.csv"
		href={`${process.env.ENDPOINT}/export`}
	>
		<svg
			className={clsx(
				'h-5 w-5',
				active ? 'stroke-current' : 'text-gray-200'
			)}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			/>
		</svg>
	</a>
);

export default TableExport;
