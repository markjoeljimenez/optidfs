import { useAppSelector } from '../../hooks';

const ErrorContainer = () => {
	const { error } = useAppSelector((state) => state);

	return (
		<div className="text-center mx-auto" style={{ maxWidth: '500px' }}>
			<svg
				className="mx-auto"
				id="Layer_1"
				data-name="Layer 1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 400 300"
				width="400"
				height="300"
			>
				<path
					d="M214.66,43.78s-11-3-13.35-13.2c0,0,17-3.44,17.48,14.1Z"
					fill="#bee3f8"
					opacity="0.58"
				/>
				<path
					d="M216,42.69s-7.67-12.11-.92-23.44c0,0,12.92,8.21,7.18,23.47Z"
					fill="#bee3f8"
					opacity="0.73"
				/>
				<path
					d="M218,42.7S222,29.91,234.27,27.49c0,0,2.29,8.3-7.93,15.25Z"
					fill="#bee3f8"
				/>
				<polygon
					points="210.03 42.41 212.25 57.63 226.25 57.69 228.32 42.49 210.03 42.41"
					fill="#24285b"
				/>
				<ellipse
					cx="214.37"
					cy="253.87"
					rx="166.62"
					ry="19.34"
					fill="#e6e6e6"
					opacity="0.45"
				/>
				<rect
					x="145.25"
					y="68.91"
					width="114.61"
					height="189.58"
					fill="#24285b"
				/>
				<rect
					x="154.69"
					y="78.28"
					width="95.49"
					height="30.49"
					rx="9.29"
					fill="#fff"
					opacity="0.07"
				/>
				<rect
					x="172.14"
					y="58.02"
					width="58.34"
					height="10.89"
					fill="#bee3f8"
				/>
				<circle cx="232.77" cy="93.57" r="8.16" fill="#bee3f8" />
				<rect
					x="164.47"
					y="89.69"
					width="48.07"
					height="7.75"
					fill="#fff"
				/>
				<rect
					x="154.69"
					y="124.63"
					width="95.49"
					height="30.49"
					rx="9.29"
					fill="#fff"
					opacity="0.07"
				/>
				<circle cx="232.77" cy="139.91" r="8.16" fill="#bee3f8" />
				<rect
					x="164.47"
					y="136.03"
					width="48.07"
					height="7.75"
					fill="#fff"
				/>
				<rect
					x="154.69"
					y="170.97"
					width="95.49"
					height="30.49"
					rx="9.29"
					fill="#fff"
					opacity="0.07"
				/>
				<circle cx="232.77" cy="186.25" r="8.16" fill="#bee3f8" />
				<rect
					x="164.47"
					y="182.37"
					width="48.07"
					height="7.75"
					fill="#fff"
				/>
				<rect
					x="154.69"
					y="217.31"
					width="95.49"
					height="30.49"
					rx="9.29"
					fill="#fff"
					opacity="0.07"
				/>
				<circle cx="232.77" cy="232.59" r="8.16" fill="#bee3f8" />
				<rect
					x="164.47"
					y="228.72"
					width="48.07"
					height="7.75"
					fill="#fff"
				/>
				<rect
					x="283.01"
					y="209.35"
					width="8.68"
					height="49.13"
					fill="#bee3f8"
				/>
				<rect
					x="329.91"
					y="209.35"
					width="8.68"
					height="49.13"
					fill="#bee3f8"
				/>
				<rect
					x="283.01"
					y="209.35"
					width="8.68"
					height="49.13"
					opacity="0.08"
				/>
				<rect
					x="329.91"
					y="209.35"
					width="8.68"
					height="49.13"
					opacity="0.08"
				/>
				<rect
					x="272.73"
					y="186.21"
					width="76.17"
					height="26.87"
					fill="#bee3f8"
				/>
				<polygon
					points="276.6 186.21 285.69 213.08 298.29 213.08 287.94 186.21 276.6 186.21"
					fill="#24285b"
				/>
				<polygon
					points="299.91 186.21 309.01 213.08 321.6 213.08 311.25 186.21 299.91 186.21"
					fill="#24285b"
				/>
				<polygon
					points="323.15 186.21 332.25 213.08 344.84 213.08 334.49 186.21 323.15 186.21"
					fill="#24285b"
				/>
				<rect
					x="272.73"
					y="223.26"
					width="76.17"
					height="12.6"
					fill="#bee3f8"
				/>
				<rect
					x="272.73"
					y="223.26"
					width="76.17"
					height="12.6"
					fill="#fff"
					opacity="0.46"
				/>
				<rect
					x="59.06"
					y="125.23"
					width="64.09"
					height="72.67"
					fill="#e6e6e6"
				/>
				<polygon
					points="91.11 134.18 68.64 168.59 91.11 168.59 113.57 168.59 91.11 134.18"
					fill="#ffd200"
				/>
				<rect
					x="89.33"
					y="146.98"
					width="3.19"
					height="10.34"
					fill="#24285b"
				/>
				<rect
					x="89.33"
					y="159.34"
					width="3.19"
					height="3.19"
					fill="#24285b"
				/>
				<rect
					x="68.64"
					y="175.9"
					width="44.92"
					height="12.26"
					opacity="0.08"
				/>
			</svg>
			<div>
				<h1 className="text-4xl font-black">{error?.message}</h1>
				<p>Unfortunately we couldn&apos;t optimize your lineups.</p>

				{/* <p className="mt-6">This may be due to several factors:</p>
				<ul className="pl-10 list-disc text-left mt-3 space-y-2">
					<li className="pl-2">
						If you&apos;ve uploaded a CSV, confirm that you&apos;ve
						selected the correct sport.
					</li>
					<li className="pl-2">
						The sport you&apos;ve selected is not yet supported.
					</li>
				</ul> */}
			</div>
		</div>
	);
};

export default ErrorContainer;
