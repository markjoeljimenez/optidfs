import { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';

import { IDraftKingsPlayer } from '../interfaces/IDraftKingsResponse';

interface ITable {
	lineups?: IDraftKingsPlayer[];
	lockedPlayers?: IDraftKingsPlayer[];
	players?: IDraftKingsPlayer[];
	totalSalary?: number;
	totalFppg?: number;
	page: number;
	previous: () => void;
	next: () => void;
	lock: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setExposure: (id, value) => void;
	setProjectedOwnership: (id, value) => void;
}

const Table = ({
	lineups,
	lockedPlayers,
	players,
	totalSalary,
	totalFppg,
	page,
	previous,
	next,
	lock,
	setExposure,
	setProjectedOwnership,
}: ITable) => {
	const optionsRef = useRef<(HTMLDivElement | null)[]>([]);

	const [activeRow, setActiveRow] = useState<number | null>(null);

	useEffect(() => {
		optionsRef.current = optionsRef.current.slice(0, players?.length);
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		lock(e);
	};

	const handleExposureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		const id = e.currentTarget.getAttribute('data-player-id');

		if (id) {
			setExposure(id, value);
		}
	};

	const handleOptionsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const { value } = e.currentTarget;

		setActiveRow(activeRow === parseInt(value) ? null : parseInt(value));
	};

	const handleProjectedOwnershipChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value } = e.currentTarget;
		const id = e.currentTarget.getAttribute('data-player-id');

		setProjectedOwnership(id, value);
	};

	return (
		<div role="table">
			<div
				className="bg-gray-100 border-b border-gray-300 md:block hidden"
				role="rowgroup"
			>
				<div
					className="grid grid-cols-table-md text-xs uppercase font-black container mx-auto px-8"
					role="row"
				>
					<div
						className="p-3 px-0 flex justify-center"
						role="columnheader"
					>
						<span hidden>Lock</span>
						<svg
							className="fill-current"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="24"
							height="24"
						>
							<g data-name="Layer 2">
								<g data-name="lock">
									<rect width="24" height="24" opacity="0" />
									<path d="M17 8h-1V6.11a4 4 0 1 0-8 0V8H7a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3zm-7-1.89A2.06 2.06 0 0 1 12 4a2.06 2.06 0 0 1 2 2.11V8h-4zM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1z" />
									<path d="M12 12a3 3 0 1 0 3 3 3 3 0 0 0-3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1z" />
								</g>
							</g>
						</svg>
					</div>
					<div
						className="p-2 flex items-center justify-center"
						role="columnheader"
					>
						Status
					</div>
					<div className="p-2 flex items-center" role="columnheader">
						First name
					</div>
					<div className="p-2 flex items-center" role="columnheader">
						Last name
					</div>
					<div className="p-2 flex items-center" role="columnheader">
						Positions
					</div>
					<div className="p-2 flex items-center" role="columnheader">
						Team
					</div>
					<div
						className="p-2 flex items-center justify-end"
						role="columnheader"
					>
						Salary
					</div>
					<div
						className="p-2 flex items-center justify-end"
						role="columnheader"
					>
						FPPG
					</div>
					<div className="p-2" role="columnheader">
						<span hidden>Options</span>
					</div>
				</div>
			</div>
			<div role="rowgroup">
				{players?.map((player, i) => (
					<div role="row" key={player.id} aria-rowindex={i}>
						<div
							className="border-b border-gray-300 text-sm md:text-base"
							role="rowgroup"
						>
							<div
								className="py-4 px-8 grid grid-cols-table-sm md:grid-cols-table-md grid-rows-3 md:grid-rows-1 container mx-auto md:py-0 relative"
								role="row"
								key={Math.random()}
								// aria-rowindex={i}
							>
								<div
									className="md:p-2 md:py-4 pl-0 md:flex items-center justify-center col-start-1 md:col-start-auto hidden"
									role="cell"
								>
									{player.status !== 'O' ? (
										<label htmlFor="lock">
											<span className="md:hidden">
												Lock
											</span>
											<input
												id="lock"
												className="checkbox"
												type="checkbox"
												onChange={handleChange}
												defaultChecked={lockedPlayers?.some(
													(_player) =>
														_player.id === player.id
												)}
												value={player.id}
											/>
										</label>
									) : (
										<></>
									)}
								</div>
								<div
									className="md:p-2 md:py-4 flex items-center justify-start md:justify-center"
									role="cell"
								>
									<div
										className={clsx([
											'px-2 py-1 md:px-3 md:py-2 inline rounded font-black',
											player.status
												? [
														player.status === 'O'
															? 'text-red-800 bg-red-300'
															: '',
														player.status === 'Q'
															? 'text-orange-800 bg-orange-300'
															: '',
												  ]
												: 'text-green-800 bg-green-300',
										])}
									>
										{player.status
											? player.status === 'O'
												? 'Out'
												: player.status === 'Q'
												? 'GTD'
												: player.status
											: 'Active'}
									</div>
								</div>
								<div
									className="md:p-2 md:py-4 flex items-center font-black md:font-normal"
									role="cell"
								>
									<div>
										{player.first_name}
										<span className="ml-1 md:hidden">
											{player.last_name}
										</span>
									</div>
								</div>
								<div
									className="md:p-2 md:py-4 items-center md:flex hidden"
									role="cell"
								>
									{player.last_name}
								</div>
								<div
									className="md:p-2 md:py-4 flex items-center row-start-2 col-start-2 md:row-start-auto md:col-start-auto"
									role="cell"
								>
									{player.position}
								</div>
								<div
									className="md:p-2 md:py-4 flex items-center row-start-3 col-start-2 md:row-start-auto md:col-start-auto"
									role="cell"
								>
									{player.team}
								</div>
								<div
									className="md:p-2 md:py-4 flex items-center justify-end row-start-3 col-start-3 md:row-start-auto md:col-start-auto"
									role="cell"
								>
									{' '}
									{new Intl.NumberFormat('en-US', {
										style: 'currency',
										currency: 'USD',
										minimumFractionDigits: 0,
									}).format(player.salary)}
								</div>
								<div
									className="md:p-2 md:py-4 flex items-center justify-end row-start-2 col-start-3 md:row-start-auto md:col-start-auto"
									role="cell"
								>
									{player.points_per_contest}
								</div>
								<div
									className="md:p-2 md:py-4 pr-0 flex justify-end items-center row-start-1 col-start-4 md:row-start-auto md:col-start-auto"
									role="cell"
								>
									{player.status !== 'O' && (
										<button
											type="button"
											onClick={handleOptionsClick}
											value={i}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												width="24"
												height="24"
											>
												<g
													data-name="Layer 2"
													fill="#013262"
												>
													<g data-name="more-vertical">
														<rect
															width="24"
															height="24"
															transform="rotate(-90 12 12)"
															opacity="0"
														/>
														<circle
															cx="12"
															cy="12"
															r="2"
														/>
														<circle
															cx="12"
															cy="5"
															r="2"
														/>
														<circle
															cx="12"
															cy="19"
															r="2"
														/>
													</g>
												</g>
											</svg>
										</button>
									)}
								</div>
							</div>
						</div>

						{player.status !== 'O' && i === activeRow ? (
							<div role="rowgroup">
								<div
									className="border-b border-gray-300"
									role="row"
									key={Math.random()}
									// aria-rowindex={i}
								>
									<div
										className="container mx-auto px-8 py-4 flex"
										role="cell"
									>
										<div className="w-1/4">
											<span className="text-xs uppercase font-black mb-2 block">
												Minimum exposure
											</span>
											<div>
												<label
													htmlFor={`set-exposure-${player.id}`}
												>
													<span className="sr-only">
														Minimum exposure
													</span>
													<input
														className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
														id={`set-exposure-${player.id}`}
														type="number"
														min={0}
														max={1}
														step={0.1}
														defaultValue={
															player.min_exposure
														}
														data-player-id={
															player.id
														}
														onChange={
															handleExposureChange
														}
													/>
												</label>
											</div>
										</div>
										<div className="w-1/4 ml-8">
											<span className="text-xs uppercase font-black mb-2 block">
												Projected Ownership
											</span>
											<div>
												<label
													htmlFor={`set-ownership-projection-${player.id}`}
												>
													<span className="sr-only">
														Projected Ownership
													</span>
													<input
														className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
														id={`set-ownership-projection-${player.id}`}
														type="number"
														min={0}
														max={1}
														step={0.1}
														defaultValue={
															player.projected_ownership
														}
														data-player-id={
															player.id
														}
														onChange={
															handleProjectedOwnershipChange
														}
													/>
												</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						) : (
							<></>
						)}
					</div>
				))}
			</div>

			{lineups && (
				<div className="border-b border-gray-300" role="rowgroup">
					<div
						className="grid gap-2 md:gap-0 grid-cols-table-md font-black container mx-auto px-8"
						role="row"
					>
						<div className="p-2 py-5" role="cell">
							Total
						</div>
						<div
							className="p-2 py-5 flex items-center justify-end col-start-4 md:col-start-7"
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
								<button
									type="button"
									onClick={() => previous()}
								>
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

								<button type="button" onClick={() => next()}>
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
		</div>
	);
};

export default Table;
