import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import sports from '../../data/sports';

const Nav = (props: any) => {
	const router = useRouter();

	const [isActive, setActiveState] = useState(false);

	const onClick = () => {
		setActiveState(!isActive);
	};

	const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.currentTarget;

		props.setSport(value);
	};

	return (
		<>
			{/* <div className="alert alert--mobile">
				<div className="container">
					The mobile version of this app is still being worked on. For
					the best experience, please view the page on a larger
					screen.
				</div>
			</div> */}
			<nav className={`nav ${isActive ? 'nav--active' : ''}`}>
				<div className="nav__container">
					<button
						className="nav__mobile-button"
						onClick={onClick}
						type="button"
					>
						{isActive ? (
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
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="24"
								height="24"
							>
								<g data-name="Layer 2">
									<g data-name="menu">
										<rect
											width="24"
											height="24"
											transform="rotate(180 12 12)"
											opacity="0"
										/>
										<rect
											x="3"
											y="11"
											width="18"
											height="2"
											rx=".95"
											ry=".95"
										/>
										<rect
											x="3"
											y="16"
											width="18"
											height="2"
											rx=".95"
											ry=".95"
										/>
										<rect
											x="3"
											y="6"
											width="18"
											height="2"
											rx=".95"
											ry=".95"
										/>
									</g>
								</g>
							</svg>
						)}
						Menu
					</button>
					<h1 className="nav__heading">DK Optimizer</h1>
				</div>
				<ul className="nav__list">
					<li className="nav__item">
						<div className="select">
							<label
								htmlFor="selectSport"
								className="select__label"
							>
								<span>Select Sport</span>
								<select
									onChange={handleSportChange}
									className="select__input"
									id="selectSport"
								>
									{sports.map((sport) => (
										<option value={sport} key={sport}>
											{sport}
										</option>
									))}
								</select>
							</label>
						</div>
					</li>
					<li className="nav__item">
						<Link href="/">
							<a
								className={`nav__link ${
									router.pathname === '/' &&
									'nav__link--active'
								}`}
							>
								Optimize
							</a>
						</Link>
					</li>
					<li className="nav__item">
						<Link href="/about">
							<a
								className={`nav__link ${
									router.pathname === '/about' &&
									'nav__link--active'
								}`}
							>
								About
							</a>
						</Link>
					</li>

					{/* <li className="nav__item">
                                <Link
                                    to="/statistics"
                                    className="nav__link"
                                    activeClassName="nav__link--active"
                                >
                                    Statistics
                                </Link>
                            </li>
                            <li className="nav__item">
                                <Link
                                    to="/help"
                                    className="nav__link"
                                    activeClassName="nav__link--active"
                                >
                                    Help
                                </Link>
                            </li> */}
				</ul>
			</nav>
		</>
	);
};

export default Nav;
