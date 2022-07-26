import { Table } from '@tanstack/react-table';
import clsx from 'clsx';

interface ITableFooter {
	children: React.ReactNode;
}

const TableFooter = ({ children }: ITableFooter) => (
	<div className="sticky bottom-0 bg-white" role="rolegroup">
		{children}

		{/* Gap at bottom of screen */}
		<div className="bg-gray-100 h-[2rem]" />
	</div>
);

export default TableFooter;
