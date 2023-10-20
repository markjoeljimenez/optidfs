import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Auth from '../auth';
import Donate from './donate';

const Nav = () => {
	const router = useRouter();
	const [isActive, setActiveState] = useState(false);

	const onClick = () => {
		setActiveState(!isActive);
	};

	return (
		<nav
			className="px-6 py-4 md:py-8 border-r border-gray-200 font-bold flex flex-col bg-white"
			data-testid="nav"
		>
			<div className="relative flex justify-between items-center md:block md:min-w-nav">
				<Auth />

				<button className="md:hidden" type="button" onClick={onClick}>
					{isActive ? (
						<svg
							height="24"
							viewBox="0 0 24 24"
							width="24"
							xmlns="http://www.w3.org/2000/svg"
						>
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
					) : (
						<svg
							height="24"
							viewBox="0 0 24 24"
							width="24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g data-name="Layer 2">
								<g data-name="menu">
									<rect
										height="24"
										opacity="0"
										transform="rotate(180 12 12)"
										width="24"
									/>
									<rect
										height="2"
										rx=".95"
										ry=".95"
										width="18"
										x="3"
										y="11"
									/>
									<rect
										height="2"
										rx=".95"
										ry=".95"
										width="18"
										x="3"
										y="16"
									/>
									<rect
										height="2"
										rx=".95"
										ry=".95"
										width="18"
										x="3"
										y="6"
									/>
								</g>
							</g>
						</svg>
					)}
					<span className="sr-only">Menu</span>
				</button>
				{/* <picture className="block max-w-logo-sm md:max-w-logo-md absolute ml-10 md:ml-0 md:relative">
						<img
							className="block"
							src="/images/fortify.svg"
							alt="Fortify logo"
						/>
					</picture> */}
				<h1 className="absolute ml-10 md:ml-0 md:relative md:text-3xl font-black whitespace-no-wrap">
					Optidfs
				</h1>
			</div>
			<div
				className={clsx(
					'md:max-h-none overflow-hidden transition-all duration-300 flex-1 flex flex-col justify-between space-y-6 text-gray-600 font-medium',
					isActive ? 'max-h-10' : 'max-h-0'
				)}
			>
				<ul>
					<li className="mt-6"></li>
				</ul>
				<div className="flex items-center flex-col space-y-6 text-center">
					<Donate />
				</div>
			</div>
		</nav>
	);
};

export default Nav;
