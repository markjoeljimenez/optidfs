import React from 'react';

interface IModalProps {
    active: boolean;
    onModalCloseClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Modal({ active, onModalCloseClick }: IModalProps) {
	return (
		<div className={`modal ${active ? 'modal--active' : ''}`} role="dialog">
			<div className="modal__content">
				<button className="modal__close" onClick={onModalCloseClick}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
						<g data-name="Layer 2">
							<g data-name="close">
								<rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" />
								<path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
							</g>
						</g>
					</svg>
					Close
				</button>

				<form className="modal__form form form--white" name="send_feedback" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
					<h2 className="form__heading">Comments, suggestions, bugs?</h2>
					<p>Leave a message!</p>

					<input type="hidden" name="form-name" value="send_feedback" hidden />
					<label className="form__label" htmlFor="bot-field" hidden>Don’t fill this out if you're human:</label>
					<input type="hidden" name="bot-field" id="bot-field" hidden />

					<div className="form__row row">
						<div className="form__col col">
							<label className="form__label" htmlFor="name">Your Name:</label>
							<input className="form__input input" type="text" name="name" id="name" placeholder="Name" />
						</div>
					</div>

					<div className="form__row row">
						<div className="form__col col">
							<label className="form__label" htmlFor="email">Your Email:</label>
							<input className="form__input input" type="email" name="email" id="email" placeholder="Email" />
						</div>
					</div>

					<div className="form__row row">
						<div className="form__col col">
							<label className="form__label" htmlFor="message">Message:</label>
							<textarea className="form__textarea textarea" name="message" placeholder="Message" id="message" />
						</div>
					</div>

					<div className="form__row row">
						<div className="form__col col">
							<button className="button" type="submit">Send</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
