interface ILoading {
	children: React.ReactNode;
	loading?: boolean;
}

const Loading = ({ children, loading }: ILoading) =>
	loading ? (
		<div className="loading">Generating line ups...</div>
	) : (
		<>{children}</>
	);

export default Loading;
