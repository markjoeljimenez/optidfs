interface ITableFooter {
	children: React.ReactNode;
	scrollbarWidth: number;
}

export const TableFooter = ({ children, scrollbarWidth }: ITableFooter) => (
	<div
		className="bg-white"
		role="rolegroup"
		style={{ paddingRight: `${scrollbarWidth}px` }}
	>
		{children}
	</div>
);
