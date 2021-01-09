import Modal from 'react-modal';
import { FormEvent, useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { connect } from 'react-redux';
import { getPlayers } from '../Dropdown/Dropdown.actions';

Modal.setAppElement('#__next');

const customStyles = {
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.35)',
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

const Upload = (props: any) => {
	const fileRef = useRef<HTMLDivElement>(null);
	const gameTypeSelectRef = useRef<HTMLSelectElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);

	const [isModalActive, setIsModalActive] = useState(false);
	const [file, setFile] = useState<null | any>(null);

	const onDrop = useCallback((files) => {
		if (files) {
			setFile(files[0]);

			if (fileRef.current) {
				fileRef.current.innerHTML = files[0].name;
			}
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: '.csv',
		onDrop,
	});

	const submitUpload = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (file && gameTypeSelectRef) {
			props.getPlayers(file, gameTypeSelectRef.current!.value);
		}
	};

	return (
		<>
			<button
				className="px-6 py-2 ml-4 font-black rounded border shadow"
				type="button"
				onClick={() => {
					setIsModalActive(!isModalActive);
				}}
			>
				Upload CSV
			</button>
			<Modal
				isOpen={isModalActive}
				// contentLabel="onRequestClose Example"
				onRequestClose={() => setIsModalActive(false)}
				style={customStyles}
			>
				<div ref={modalRef}>
					<form onSubmit={submitUpload}>
						<div
							{...getRootProps()}
							className="inline-block border-gray-500 border-dashed border-2 rounded px-4 py-2 cursor-pointer font-bold"
						>
							<input {...getInputProps()} required />
							<p>
								Drag 'n' drop some files here, or click to
								select files
							</p>
						</div>
						<div ref={fileRef} />
						<div className="flex justify-between mt-8">
							<select
								className="font-bold cursor-pointer shadow appearance-none border rounded py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								name="gameType"
								id="gameType"
								required
								defaultValue=""
								ref={gameTypeSelectRef}
							>
								<option value="" disabled>
									Select game type
								</option>
								<option value="Classic">Classic</option>
								<option value="Showdown Captain Mode">
									Showdown Captain Mode
								</option>
							</select>
							<button
								className="px-6 py-2 font-black rounded-lg bg-blue-300 text-blue-900"
								type="submit"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</Modal>
		</>
	);
};

const mapDispatchToProps = (dispatch) => ({
	getPlayers: (file, gameType) => dispatch(getPlayers(file, gameType)),
});

export default connect(null, mapDispatchToProps)(Upload);
