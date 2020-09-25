import { connect } from 'react-redux';
import handleSearch from './Search.actions';

const SearchContainer = (props: any) => {
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;

		props.onChange(value);
	};

	return (
		<div className="input input--icon-left search">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				className="input__icon"
			>
				<g data-name="Layer 2">
					<g data-name="search">
						<rect width="24" height="24" opacity="0" />
						<path d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z" />
					</g>
				</g>
			</svg>
			<input
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
