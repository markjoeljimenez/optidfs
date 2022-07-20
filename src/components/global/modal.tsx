import React from 'react';

const Modal = ({
	children,
	openModal,
}: {
	children: React.ReactNode;
	openModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => (
	<div className="modal">
		<div className="modal__content">
			{children}
			<button className="modal__button" type="button" onClick={openModal}>
				<span className="hidden">Close</span>
				<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<g data-name="Layer 2">
						<g data-name="close">
							<rect
								height="24"
								opacity="0"
								transform="rotate(180 12 12)"
								width="24"
							/>
							<path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
						</g>
					</g>
				</svg>
			</button>
		</div>
	</div>
);

export default Modal;
