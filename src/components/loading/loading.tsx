interface ILoading {
	children: React.ReactNode;
	loading?: boolean;
	message?: string;
}

const Loading = ({ children, loading, message }: ILoading) =>
	loading ? (
		<div className="loading">{message ?? 'Loading...'}</div>
	) : (
		<>{children}</>
	);

export default Loading;
