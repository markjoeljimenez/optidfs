import { connect } from 'react-redux';
import handleSearch from './Search.actions';

const SearchContainer = (props: any) => {
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;

		props.onChange(value);
	};

	return (
		<div className="relative h-full md:min-w-9">
			<div className="absolute inset-y-0 left-0 flex items-center">
				<svg
					className="fill-current"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="24"
					height="24"
				>
					<g data-name="Layer 2">
						<g data-name="search">
							<rect width="24" height="24" opacity="0" />
							<path d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z" />
						</g>
					</g>
				</svg>
			</div>

			<input
				// className="shadow appearance-none border rounded w-full py-3 px-4 pl-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				className="py-2 px-4 pl-8 h-full w-full border-b border-blue-800 focus:outline-none focus:shadow-outline"
				type="search"
				placeholder="Search by player, team, or position"
				onChange={onChange}
			/>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	onChange: (value) => dispatch(handleSearch(value)),
});

export default connect(null, mapDispatchToProps)(SearchContainer);
