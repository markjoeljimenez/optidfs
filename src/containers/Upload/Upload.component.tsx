import { FormEvent, useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Modal from 'react-modal';

import { useAppDispatch } from '../../hooks';
import { setGameType } from '../Contests/Dropdown.actions';
import { getPlayers } from '../Players/redux/Players.actions';

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
		padding: '30px',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

const Upload = () => {
	const dispatch = useAppDispatch();
	const fileRef = useRef<HTMLDivElement>(null);
	const gameTypeSelectRef = useRef<HTMLSelectElement>(null);

	const [isModalActive, setIsModalActive] = useState(false);
	const [file, setFile] = useState<null | File>(null);

	const onDrop = useCallback((files: File[]) => {
		if (files) {
			setFile(files[0]);

			if (fileRef.current) {
				fileRef.current.innerHTML = `${files[0].name} (${
					files[0].size / 1000
				} KB)`;
			}
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: '.csv',
		onDrop,
	});

	function submitUpload(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (file && gameTypeSelectRef?.current) {
			dispatch(getPlayers(file));
			dispatch(setGameType(gameTypeSelectRef?.current?.value));
			setIsModalActive(false);
		}
	}

	return (
		<>
			<button
				className="px-4 py-3 font-black rounded border shadow"
				type="button"
				onClick={() => {
					setIsModalActive(!isModalActive);
				}}
			>
				Upload CSV
			</button>
			<Modal
				isOpen={isModalActive}
				contentLabel="Drag 'n' drop your CSV here, or click to select files"
				onRequestClose={() => setIsModalActive(false)}
				multiple={false}
				style={customStyles}
				validate
			>
				<form onSubmit={submitUpload}>
					<button
						className="absolute top-0 right-0"
						onClick={() => setIsModalActive(false)}
						type="button"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="24"
							height="24"
						>
							<g data-name="Layer 2">
								<g data-name="close">
									<rect
										width="24"
										height="24"
										transform="rotate(180 12 12)"
										opacity="0"
									/>
									<path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
								</g>
							</g>
						</svg>
						<span className="sr-only">Close</span>
					</button>
					<div
						{...getRootProps()}
						className="inline-block border-gray-500 border-dashed border-2 p-8 w-full rounded cursor-pointer font-bold text-center"
						style={{
							minWidth: '30rem',
						}}
					>
						<input {...getInputProps()} required />
						<p>
							Drag &apos;n&apos; drop your CSV here, or click to
							select files
						</p>
						{file && (
							<p
								ref={fileRef}
								className="font-normal italic mt-2"
							/>
						)}
					</div>
					<div className="flex justify-between mt-6">
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
			</Modal>
		</>
	);
};

// const mapDispatchToProps = (dispatch) => ({
// 	getPlayers: (file, gameType) => dispatch(getPlayers(file, gameType)),
// });

export default Upload;
