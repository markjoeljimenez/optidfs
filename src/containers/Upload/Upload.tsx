import { connect } from 'react-redux';
import { getPlayers } from '../Dropdown/Dropdown.actions';
import { setCsv } from './Upload.actions';

const Upload = (props: any) => {
	const handleUploadCsv = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = e.currentTarget;

		if (files) {
			props.getPlayers(files[0]);
			props.setCsv(files[0]);
		}
	};

	return (
		<input
			// className="mt-4"
			type="file"
			name="test"
			id="test"
			placeholder="Upload CSV"
			accept=".csv"
			onChange={handleUploadCsv}
		/>
	);
};

const mapDispatchToProps = (dispatch) => ({
	getPlayers: (file) => dispatch(getPlayers(file)),
	setCsv: (file) => dispatch(setCsv(file)),
});

export default connect(null, mapDispatchToProps)(Upload);
