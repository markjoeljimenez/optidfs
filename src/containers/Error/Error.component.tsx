import { useAppSelector } from '../../hooks';

const ErrorContainer = () => {
	const { error } = useAppSelector((state) => state);

	return (
		<div className="text-center mx-auto" style={{ maxWidth: '500px' }}>
			<svg
				className="mx-auto"
				data-name="Layer 1"
				height="300"
				id="Layer_1"
				viewBox="0 0 400 300"
				width="400"
				xmlns="http://www.w3.org/2000/svg"
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
					fill="#24285b"
					points="210.03 42.41 212.25 57.63 226.25 57.69 228.32 42.49 210.03 42.41"
				/>
				<ellipse
					cx="214.37"
					cy="253.87"
					fill="#e6e6e6"
					opacity="0.45"
					rx="166.62"
					ry="19.34"
				/>
				<rect
					fill="#24285b"
					height="189.58"
					width="114.61"
					x="145.25"
					y="68.91"
				/>
				<rect
					fill="#fff"
					height="30.49"
					opacity="0.07"
					rx="9.29"
					width="95.49"
					x="154.69"
					y="78.28"
				/>
				<rect
					fill="#bee3f8"
					height="10.89"
					width="58.34"
					x="172.14"
					y="58.02"
				/>
				<circle cx="232.77" cy="93.57" fill="#bee3f8" r="8.16" />
				<rect
					fill="#fff"
					height="7.75"
					width="48.07"
					x="164.47"
					y="89.69"
				/>
				<rect
					fill="#fff"
					height="30.49"
					opacity="0.07"
					rx="9.29"
					width="95.49"
					x="154.69"
					y="124.63"
				/>
				<circle cx="232.77" cy="139.91" fill="#bee3f8" r="8.16" />
				<rect
					fill="#fff"
					height="7.75"
					width="48.07"
					x="164.47"
					y="136.03"
				/>
				<rect
					fill="#fff"
					height="30.49"
					opacity="0.07"
					rx="9.29"
					width="95.49"
					x="154.69"
					y="170.97"
				/>
				<circle cx="232.77" cy="186.25" fill="#bee3f8" r="8.16" />
				<rect
					fill="#fff"
					height="7.75"
					width="48.07"
					x="164.47"
					y="182.37"
				/>
				<rect
					fill="#fff"
					height="30.49"
					opacity="0.07"
					rx="9.29"
					width="95.49"
					x="154.69"
					y="217.31"
				/>
				<circle cx="232.77" cy="232.59" fill="#bee3f8" r="8.16" />
				<rect
					fill="#fff"
					height="7.75"
					width="48.07"
					x="164.47"
					y="228.72"
				/>
				<rect
					fill="#bee3f8"
					height="49.13"
					width="8.68"
					x="283.01"
					y="209.35"
				/>
				<rect
					fill="#bee3f8"
					height="49.13"
					width="8.68"
					x="329.91"
					y="209.35"
				/>
				<rect
					height="49.13"
					opacity="0.08"
					width="8.68"
					x="283.01"
					y="209.35"
				/>
				<rect
					height="49.13"
					opacity="0.08"
					width="8.68"
					x="329.91"
					y="209.35"
				/>
				<rect
					fill="#bee3f8"
					height="26.87"
					width="76.17"
					x="272.73"
					y="186.21"
				/>
				<polygon
					fill="#24285b"
					points="276.6 186.21 285.69 213.08 298.29 213.08 287.94 186.21 276.6 186.21"
				/>
				<polygon
					fill="#24285b"
					points="299.91 186.21 309.01 213.08 321.6 213.08 311.25 186.21 299.91 186.21"
				/>
				<polygon
					fill="#24285b"
					points="323.15 186.21 332.25 213.08 344.84 213.08 334.49 186.21 323.15 186.21"
				/>
				<rect
					fill="#bee3f8"
					height="12.6"
					width="76.17"
					x="272.73"
					y="223.26"
				/>
				<rect
					fill="#fff"
					height="12.6"
					opacity="0.46"
					width="76.17"
					x="272.73"
					y="223.26"
				/>
				<rect
					fill="#e6e6e6"
					height="72.67"
					width="64.09"
					x="59.06"
					y="125.23"
				/>
				<polygon
					fill="#ffd200"
					points="91.11 134.18 68.64 168.59 91.11 168.59 113.57 168.59 91.11 134.18"
				/>
				<rect
					fill="#24285b"
					height="10.34"
					width="3.19"
					x="89.33"
					y="146.98"
				/>
				<rect
					fill="#24285b"
					height="3.19"
					width="3.19"
					x="89.33"
					y="159.34"
				/>
				<rect
					height="12.26"
					opacity="0.08"
					width="44.92"
					x="68.64"
					y="175.9"
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
