import { useAppDispatch, useAppSelector } from '../../../hooks';

import { updateLineupsPage } from '../../Players/Players.actions';
import { setPage } from '../Table.actions';

const Footer = () => {
	const { page, view } = useAppSelector((state) => state.table);
	const { lineups, totalFppg, totalSalary } = useAppSelector(
		(state) => state.players
	);
	const dispatch = useAppDispatch();

	const handleNext = () => {
		const pageNum = page + 1;

		if (lineups && pageNum < lineups?.length) {
			dispatch(setPage(pageNum));
			dispatch(updateLineupsPage(pageNum));
		}
	};

	const handlePrevious = () => {
		const pageNum = page - 1;

		if (lineups && pageNum >= 0) {
			dispatch(setPage(pageNum));
			dispatch(updateLineupsPage(pageNum));
		}
	};

	return (
		<>
			{lineups && view === 'optimized' && (
				<div className="border-b border-gray-300" role="rowgroup">
					<div
						className="grid gap-2 md:gap-0 grid-cols-table-md font-black container mx-auto px-8"
						role="row"
					>
						<div className="p-2 py-5" role="cell">
							Total
						</div>
						<div
							className="p-2 py-5 flex items-center justify-end col-start-4 md:col-start-6"
							role="cell"
						>
							{totalSalary &&
								new Intl.NumberFormat('en-US', {
									style: 'currency',
									currency: 'USD',
									minimumFractionDigits: 0,
								}).format(totalSalary)}
						</div>
						<div
							className="p-2 py-5 flex items-center justify-end"
							role="cell"
						>
							{totalFppg}
						</div>
					</div>

					{lineups.length > 1 && (
						<div
							role="row"
							className="grid grid-cols-table-md font-black border-t border-gray-300"
						>
							<div
								className="p-2 py-5 flex items-center justify-between col-span-9 container mx-auto px-8 "
								role="cell"
							>
								<button type="button" onClick={handlePrevious}>
									<span className="sr-only">Previous</span>

									<svg
										className="fill-current"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										width="24"
										height="24"
									>
										<g data-name="Layer 2">
											<g data-name="arrow-ios-back">
												<rect
													width="24"
													height="24"
													transform="rotate(90 12 12)"
													opacity="0"
												/>
												<path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z" />
											</g>
										</g>
									</svg>
								</button>

								{`${page + 1} of ${
									lineups.length
								} generated lineups`}

								<button type="button" onClick={handleNext}>
									<span className="sr-only">Next</span>
									<svg
										className="fill-current"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										width="24"
										height="24"
									>
										<g data-name="Layer 2">
											<g data-name="arrow-ios-forward">
												<rect
													width="24"
													height="24"
													transform="rotate(-90 12 12)"
													opacity="0"
												/>
												<path d="M10 19a1 1 0 0 1-.64-.23 1 1 0 0 1-.13-1.41L13.71 12 9.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z" />
											</g>
										</g>
									</svg>
								</button>
							</div>
						</div>
					)}

					<div
						className="grid grid-cols-table-md font-black border-t border-gray-300"
						role="row"
					>
						<div
							className="p-2 pr-4 py-5 flex items-center justify-center col-span-9 container mx-auto px-8"
							role="cell"
						>
							<a
								className="py-2 px-5 font-black bg-blue-200 text-blue-900 rounded-full hover:bg-blue-800 hover:text-white"
								href={`${process.env.ENDPOINT}/export`}
								download="DKSalaries.csv"
							>
								<svg
									className="fill-current inline mr-2"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									width="24"
									height="24"
								>
									<g data-name="Layer 2">
										<g data-name="download">
											<rect
												width="24"
												height="24"
												opacity="0"
											/>
											<rect
												x="4"
												y="18"
												width="16"
												height="2"
												rx="1"
												ry="1"
											/>
											<rect
												x="3"
												y="17"
												width="4"
												height="2"
												rx="1"
												ry="1"
												transform="rotate(-90 5 18)"
											/>
											<rect
												x="17"
												y="17"
												width="4"
												height="2"
												rx="1"
												ry="1"
												transform="rotate(-90 19 18)"
											/>
											<path d="M12 15a1 1 0 0 1-.58-.18l-4-2.82a1 1 0 0 1-.24-1.39 1 1 0 0 1 1.4-.24L12 12.76l3.4-2.56a1 1 0 0 1 1.2 1.6l-4 3a1 1 0 0 1-.6.2z" />
											<path d="M12 13a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1z" />
										</g>
									</g>
								</svg>
								Download CSV
							</a>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Footer;
