import React, { useState, useRef } from 'react';
import Modal from './global/modal';
import { IFilterValue } from '../pages/index.old';

interface IFilter {
	filters?: IFilterValue[];
	submitFilters: (position: IFilterValue, team: IFilterValue) => void;
	handleRemoveFromFilter: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Filter = ({
	filters,
	submitFilters,
	handleRemoveFromFilter,
}: IFilter) => {
	const [showModal, setShowModal] = useState(false);
	const positionRef = useRef<HTMLSelectElement>(null);
	const teamRef = useRef<HTMLSelectElement>(null);
	const [error, setError] = useState<string>();

	const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!showModal) {
			setError(undefined);
		}

		setShowModal(!showModal);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (
			positionRef.current!.value !== '' ||
			teamRef.current!.value !== ''
		) {
			setError(undefined);
			submitFilters(
				{
					category: positionRef.current!.getAttribute(
						'data-category'
					)!,
					value: positionRef.current!.value,
				},
				{
					category: teamRef.current!.getAttribute('data-category')!,
					value: teamRef.current!.value,
				}
			);
			setShowModal(false);
		} else {
			setError('No selection made');
		}
	};

	return (
		<div className="form__filter filter">
			Filter
			{filters?.length ? (
				<ul className="filter__list">
					{filters.map((filter, i) => (
						<li
							className={`filter__item filter__item--${filter.category}`}
							key={i}
						>
							<button
								className="filter__button"
								type="button"
								onClick={handleRemoveFromFilter}
								value={filter.value}
							>
								{filter.value}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
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
							</button>
						</li>
					))}
				</ul>
			) : (
				<></>
			)}
			<button
				className="button filter__button"
				type="button"
				onClick={openModal}
			>
				<span className="hidden">Add filter item</span>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<g data-name="Layer 2">
						<g data-name="plus">
							<rect
								width="24"
								height="24"
								transform="rotate(180 12 12)"
								opacity="0"
							/>
							<path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" />
						</g>
					</g>
				</svg>
			</button>
			{showModal ? (
				// {true ? (
				<Modal openModal={openModal}>
					<h1>Filter players:</h1>
					<form action="" onSubmit={handleSubmit}>
						<label htmlFor="position">
							Position:
							<select
								name="position"
								id="position"
								placeholder="Select position"
								ref={positionRef}
								data-category="position"
							>
								<option value="">Select position</option>
								<option value="PG">PG</option>
								<option value="SG">SG</option>
								<option value="SF">SF</option>
								<option value="PF">PF</option>
								<option value="C">C</option>
							</select>
						</label>

						<label htmlFor="team">
							Team:
							<select
								name="team"
								id="team"
								placeholder="Select team"
								ref={teamRef}
								data-category="team"
							>
								<option value="">Select team</option>
								<option value="ATL">Atlanta Hawks</option>
								<option value="BKN">Brooklyn Nets</option>
								<option value="BOS">Boston Celtics</option>
								<option value="CHA">Charlotte Hornets</option>
								<option value="CHI">Chicago Bulls</option>
								<option value="CLE">Cleveland Cavaliers</option>
								<option value="DAL">Dallas Mavericks</option>
								<option value="DEN">Denver Nuggets</option>
								<option value="DET">Detroit Pistons</option>
								<option value="GSW">
									Golden State Warriors
								</option>
								<option value="HOU">Houston Rockets</option>
								<option value="IND">Indiana Pacers</option>
								<option value="LAC">
									Los Angeles Clippers
								</option>
								<option value="LAL">Los Angeles Lakers</option>
								<option value="MEM">Memphis Grizzlies</option>
								<option value="MIA">Miami Heat</option>
								<option value="MIL">Milwaukee Bucks</option>
								<option value="MIN">
									Minnesota Timberwolves
								</option>
								<option value="NO">New Orleans Pelicans</option>
								<option value="NYK">New York Knicks</option>
								<option value="OKC">
									Oklahoma City Thunder
								</option>
								<option value="ORL">Orlando Magic</option>
								<option value="PHI">Philadelphia 76ers</option>
								<option value="PHX">Phoenix Suns</option>
								<option value="POR">
									Portland Trail Blazers
								</option>
								<option value="SAC">Sacramento Kings</option>
								<option value="SA">San Antonio Spurs</option>
								<option value="TOR">Toronto Raptors</option>
								<option value="UTA">Utah Jazz</option>
								<option value="WAS">Washington Wizards</option>
							</select>
						</label>

						<button className="form__submit" type="submit">
							Submit
						</button>

						{error ? (
							<div className="alert" role="alert">
								<p>{error}</p>
							</div>
						) : (
							<></>
						)}
					</form>
				</Modal>
			) : (
				<></>
			)}
		</div>
	);
};

export default Filter;
