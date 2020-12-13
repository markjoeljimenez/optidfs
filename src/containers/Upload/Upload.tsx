import { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { getPlayers } from '../Dropdown/Dropdown.actions';
import { setCsv } from './Upload.actions';

const Upload = (props: any) => {
	const inputRef = useRef<HTMLLabelElement>(null);

	const handleUploadCsv = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = e.currentTarget;

		if (files) {
			props.getPlayers(files[0]);
			props.setCsv(files[0]);

			if (inputRef.current) {
				inputRef.current.innerHTML = files[0].name;
				inputRef.current.className = 'border-0 px-4 py-2 font-bold';
			}
		}
	};

	return (
		<label
			htmlFor="upload"
			className="inline-block border-gray-500 border-dashed border-2 rounded px-4 py-2 cursor-pointer font-bold"
			ref={inputRef}
		>
			Upload CSV
			<input
				className="hidden"
				// className="mt-4"
				type="file"
				name="upload"
				id="upload"
				placeholder="Upload CSV"
				accept=".csv"
				onChange={handleUploadCsv}
			/>
		</label>
	);
};

const mapDispatchToProps = (dispatch) => ({
	getPlayers: (file) => dispatch(getPlayers(file)),
	setCsv: (file) => dispatch(setCsv(file)),
});

export default connect(null, mapDispatchToProps)(Upload);
