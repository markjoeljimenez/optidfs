import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';

import Sports from '../../containers/Sports/Sports.component';
import Donate from './donate';
import Providers from '../../containers/Providers/Providers.components';

const Nav = () => {
	const router = useRouter();
	const [isActive, setActiveState] = useState(false);

	const onClick = () => {
		setActiveState(!isActive);
	};

	return (
		<nav className="px-6 py-4 md:py-8 border-r border-gray-200 font-bold flex flex-col bg-white">
			<div className="relative flex justify-between items-center md:block md:min-w-nav">
				<button onClick={onClick} type="button" className="md:hidden">
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
					<li className="mt-6">
						<Link href="/">
							<a
								className={clsx(
									router.pathname === '/' && 'bg-gray-100',
									'hover:bg-gray-200',
									'block',
									'px-4',
									'py-3',
									'rounded-md'
								)}
							>
								{/* <svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									className="fill-current absolute top-50"
									width="24"
									height="24"
								>
									<g data-name="Layer 2">
										<g data-name="flash">
											<rect
												width="24"
												height="24"
												opacity="0"
											/>
											<path d="M11.11 23a1 1 0 0 1-.34-.06 1 1 0 0 1-.65-1.05l.77-7.09H5a1 1 0 0 1-.83-1.56l7.89-11.8a1 1 0 0 1 1.17-.38 1 1 0 0 1 .65 1l-.77 7.14H19a1 1 0 0 1 .83 1.56l-7.89 11.8a1 1 0 0 1-.83.44zM6.87 12.8H12a1 1 0 0 1 .74.33 1 1 0 0 1 .25.78l-.45 4.15 4.59-6.86H12a1 1 0 0 1-1-1.11l.45-4.15z" />
										</g>
									</g>
								</svg> */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 absolute top-50 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
									/>
								</svg>
								<span className="pl-8">Optimize</span>
							</a>
						</Link>
					</li>
				</ul>
				<div className="flex items-center flex-col space-y-6 text-center">
					<Donate />
				</div>
			</div>
		</nav>
	);
};

export default Nav;
