import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';

import Sports from '../../containers/Sports/Sports';
import Donate from './donate';

const Nav = (props: any) => {
	const router = useRouter();
	const [isActive, setActiveState] = useState(false);

	const onClick = () => {
		setActiveState(!isActive);
	};

	return (
		<nav className="bg-gray-100 px-6 py-4 md:py-8 border-r border-gray-200 font-bold flex flex-col">
			<div className="relative flex justify-between items-center md:block">
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
					DK Optimizer
				</h1>
			</div>
			<div
				className={clsx(
					'md:max-h-none overflow-hidden transition-all duration-300 flex-1 flex flex-col justify-between space-y-6',
					isActive ? 'max-h-10' : 'max-h-0'
				)}
			>
				<ul>
					<li className="mt-6">
						<Sports />
					</li>
					<li className="mt-6">
						<Link href="/">
							<a
								className={clsx(
									router.pathname === '/' && 'bg-gray-300',
									'hover:bg-gray-300',
									'block',
									'px-4',
									'py-3',
									'rounded-md',
									'relative'
								)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									className="fill-current absolute top-1 left-1"
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
