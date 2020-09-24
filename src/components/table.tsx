import { useRef, useEffect } from 'react';

import { IDraftKingsPlayer } from '../interfaces/IDraftKingsResponse';
import { post } from '../scripts/utilities/fetch';

const API = process.env.ENDPOINT;

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

	const handleOptionsClick = (
		e: React.MouseEvent<HTMLButtonElement>,
		HIDDEN_CLASSNAME = 'table__row-group--hidden'
	) => {
		const { value } = e.currentTarget;

		const row = optionsRef.current[parseInt(value)];

		if (row) {
			if (row.classList.contains(HIDDEN_CLASSNAME)) {
				row.classList.remove(HIDDEN_CLASSNAME);
				row.setAttribute('aria-hidden', 'false');
			} else {
				row.classList.add(HIDDEN_CLASSNAME);
				row.setAttribute('aria-hidden', 'true');
			}
		}
	};

	const handleProjectedOwnershipChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value } = e.currentTarget;
		const id = e.currentTarget.getAttribute('data-player-id');

		setProjectedOwnership(id, value);
	};

	return (
		<div className="table" role="table">
			<div
				className="table__row-group table__row-group--header"
				role="rowgroup"
			>
				<div className="table__row table__row--child" role="row">
					<div
						className="table__cell table__cell--lock table__cell--align-center"
						role="columnheader"
					>
						<span hidden>Lock</span>
						<svg
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
						className="table__cell table__cell--status table__cell--align-center"
						role="columnheader"
					>
						Status
					</div>
					<div
						className="table__cell table__cell--first-name"
						role="columnheader"
					>
						First name
					</div>
					<div
						className="table__cell table__cell--last-name"
						role="columnheader"
					>
						Last name
					</div>
					<div
						className="table__cell table__cell--positions"
						role="columnheader"
					>
						Positions
					</div>
					<div
						className="table__cell table__cell--team"
						role="columnheader"
					>
						Team
					</div>
					<div
						className="table__cell table__cell--salary table__cell--align-right"
						role="columnheader"
					>
						Salary
					</div>
					<div
						className="table__cell table__cell--fppg table__cell--align-right"
						role="columnheader"
					>
						FPPG
					</div>
					<div
						className="table__cell table__cell--options table__cell--align-center"
						role="columnheader"
					>
						<span hidden>Options</span>
					</div>
				</div>
			</div>
			<div className="table__row-group" role="rowgroup">
				{players?.map((player, i) => (
					<div
						className="table__row"
						role="row"
						key={player.id}
						aria-rowindex={i}
					>
						<div className="table__row-group" role="rowgroup">
							<div
								className="table__row table__row--child"
								role="row"
								key={Math.random()}
								// aria-rowindex={i}
							>
								<div className="table__cell-group">
									<div
										className="table__cell table__cell--lock table__cell--align-center"
										role="cell"
									>
										{player.status !== 'O' ? (
											<input
												className="checkbox"
												type="checkbox"
												onChange={handleChange}
												defaultChecked={lockedPlayers?.some(
													(_player) =>
														_player.id === player.id
												)}
												value={player.id}
											/>
										) : (
											<></>
										)}
									</div>
									<div
										className="table__cell table__cell--status table__cell--align-center"
										role="cell"
									>
										<div
											className={`pill ${
												player.status
													? `pill--${player.status}`
													: 'pill--active'
											}`}
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
								</div>

								<div className="table__cell-group table__cell-group--full-width">
									<div className="table__cell-group table__cell-group--full-width table__cell-group--row">
										<div
											className="table__cell table__cell--first-name"
											role="cell"
										>
											{player.first_name}
										</div>
										<div
											className="table__cell table__cell--last-name"
											role="cell"
										>
											{player.last_name}
										</div>
									</div>
									<div className="table__cell-group table__cell-group--full-width table__cell-group--split table__cell-group--row">
										<div className="table__cell-group">
											<div
												className="table__cell table__cell--positions"
												role="cell"
											>
												{player.position}
											</div>
											<div
												className="table__cell table__cell--team"
												role="cell"
											>
												{player.team}
											</div>
										</div>

										<div className="table__cell-group">
											<div
												className="table__cell table__cell--salary table__cell--align-right"
												role="cell"
											>
												{' '}
												{new Intl.NumberFormat(
													'en-US',
													{
														style: 'currency',
														currency: 'USD',
														minimumFractionDigits: 0,
													}
												).format(player.salary)}
											</div>
											<div
												className="table__cell table__cell--fppg table__cell--align-right"
												role="cell"
											>
												{player.points_per_contest}
											</div>
										</div>
									</div>
								</div>

								<div
									className="table__cell table__cell--options table__cell--align-center"
									role="cell"
								>
									{player.status !== 'O' && (
										<button
											type="submit"
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
						{player.status !== 'O' && (
							<div
								className="table__row-group table__row-group--hidden"
								aria-hidden
								role="rowgroup"
								ref={(ref) => {
									optionsRef.current[i] = ref;
								}}
							>
								<div
									className="table__row"
									role="row"
									key={Math.random()}
									// aria-rowindex={i}
								>
									<div className="table__cell" role="cell">
										<label
											htmlFor={`set-exposure-${player.id}`}
										>
											{/* <span className="u-hidden"> */}
											Minimum exposure
											{/* </span> */}
											<input
												id={`set-exposure-${player.id}`}
												type="number"
												min={0}
												max={1}
												step={0.1}
												defaultValue={
													player.min_exposure
												}
												data-player-id={player.id}
												onChange={handleExposureChange}
											/>
										</label>

										<label
											htmlFor={`set-ownership-projection-${player.id}`}
										>
											{/* <span className="u-hidden"> */}
											Projected Ownership
											{/* </span> */}
											<input
												id={`set-ownership-projection-${player.id}`}
												type="number"
												min={0}
												max={1}
												step={0.1}
												defaultValue={
													player.projected_ownership
												}
												data-player-id={player.id}
												onChange={
													handleProjectedOwnershipChange
												}
											/>
										</label>
									</div>
								</div>
							</div>
						)}
					</div>
				))}
			</div>

			{lineups && (
				<div className="table__row-group table__footer" role="rowgroup">
					<div className="table__row table__row--child" role="row">
						<div
							className="table__cell table__cell--total"
							role="cell"
						>
							Total
						</div>
						<div
							className="table__cell table__cell--salary table__cell--align-right"
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
							className="table__cell table__cell--fppg table__cell--align-right"
							role="cell"
						>
							{totalFppg}
						</div>
						<div
							className="table__cell table__cell--options table__cell--align-center"
							role="cell"
						/>
					</div>

					{lineups.length > 1 && (
						<div
							className="table__row table__row--child"
							role="cell"
						>
							<div className="table__cell table__cell--pagination">
								<button
									type="button"
									onClick={() => previous()}
								>
									Previous
									<svg
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
									Next
									<svg
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
					{/* <div className="table__row table__row--child" role="row">
						<div
							className="table__cell table__cell--csv table__cell--align-right"
							role="cell"
						>
							<a href={`${API}/export`} download>
								<svg
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
					</div> */}
				</div>
			)}
		</div>
	);
};

export default Table;
