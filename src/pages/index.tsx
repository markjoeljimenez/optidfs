import React, { useState, useEffect } from 'react';
import uniqBy from 'lodash.uniqby';
import fetch from 'node-fetch';
import Fuse from 'fuse.js';

import { transformPlayers } from '../scripts/utilities/transformPlayers';
import sort from '../scripts/utilities/sort';
import { IContest, IGroup, IResponse, ILineup } from '../interfaces/IApp';
import {
	IDraftKingsResponse,
	IDraftKingsPlayer,
} from '../interfaces/IDraftKingsResponse';

import Layout from '../layouts/default';
import Panel from '../templates/panel';
import Table from '../components/table';
import Filter from '../components/filter';
import { get, post } from '../scripts/utilities/fetch';
import Dropdown from '../components/dropdown';
import Input from '../components/input';

export interface IContestResponse {
	contests: IContest[];
	groups: IGroup[];
}

interface IIndex {
	data: IContestResponse;
}

export interface IFilterValue {
	category?: string;
	value?: string;
}

export interface ITotals {
	totalFppg: number;
	totalSalary: number;
}

const API = process.env.ENDPOINT;

const options = {
	includeScore: true,
	threshold: 0.2,
};

const filterPlayers = (
	filters: IFilterValue[],
	players?: IDraftKingsPlayer[]
) =>
	players?.filter((player) => {
		const bothTeamAndPosition =
			filters.some((filter) => filter.value === player.team) &&
			filters.some((filter) =>
				filter.category === 'position' && filter.value
					? player.position.includes(filter.value)
					: false
			);

		const hasTeam = filters.some((filter) => filter.category === 'team');
		const hasPosition = filters.some(
			(filter) => filter.category === 'position'
		);

		if (
			bothTeamAndPosition ||
			(filters.some((filter) => filter.value === player.team) &&
				!hasPosition) ||
			(filters.some((filter) =>
				player.position.includes(filter.value!)
			) &&
				!hasTeam)
		) {
			return true;
		}

		return false;
	});

const Index = ({ data }: IIndex) => {
	const [draftGroupId, setDraftGroupId] = useState<number | null>(null);

	const [defaultPlayers, setDefaultPlayers] = useState<IDraftKingsPlayer[]>();
	const [optimizedPlayers, setOptimizedPlayers] = useState<
		IDraftKingsPlayer[]
	>();
	const [players, setPlayers] = useState<IDraftKingsPlayer[]>();
	const [totals, setTotals] = useState<ITotals>();

	const [currentSort, setCurrentSort] = useState<string | null>();
	const [ascending, setAscending] = useState(false);

	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>('');

	// Filtering
	const [filters, setFilters] = useState<IFilterValue[]>([]);

	//
	const onContestChange = (draftSelection: IContest) => {
		if (!draftSelection) {
			return;
		}

		if (draftSelection) {
			setDraftGroupId(draftSelection.draft_group_id);
		}
	};

	// Request from API once contest is chosen
	const optimizeLineups = async (
		e: React.MouseEvent<HTMLButtonElement>,
		OPTIMIZE = 'optimize'
	) => {
		e.preventDefault();

		if (!draftGroupId) {
			return;
		}

		const URL = `${API}/${OPTIMIZE}`;

		try {
			const response = await post(URL);
			const {
				lineups,
				success,
				message,
			} = (await response.json()) as IResponse;

			const transformedPlayers = lineups[0].players.map((_player) =>
				players?.find((player) => player.id === _player)
			);

			if (success) {
				setOptimizedPlayers(transformedPlayers as any);
				setPlayers(transformedPlayers as any);
				setTotals({
					totalFppg: lineups[0].totalFppg,
					totalSalary: lineups[0].totalSalary,
				});
				setIsError(success);
			} else {
				setOptimizedPlayers(undefined);
				setPlayers(undefined);
				setTotals(undefined);
				setIsError(!success);
				setErrorMessage(message);
			}
		} catch (e) {
			console.error(
				`A problem occured when trying to retrieve API: ${e}`
			);
		}
	};

	const handleSort = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (e.currentTarget instanceof HTMLButtonElement) {
			const value = e.currentTarget.getAttribute('data-sort');

			setAscending(!ascending);

			// if (optimizedLineups) {
			// 	setOptimizedLineups(
			// 		sort(optimizedLineups, ascending, currentSort!, value!)
			// 	);

			// 	setCurrentSort(value);
			// }
		}
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!players) {
			return;
		}

		const { value } = e.currentTarget;

		const fuse = new Fuse(players, {
			...options,
			keys: ['first_name', 'last_name', 'team'],
		});

		const result = fuse.search(value);

		let transformedSearch = uniqBy(
			value
				? result.map((player) => player.item)
				: optimizedPlayers?.length
				? optimizedPlayers
				: defaultPlayers
		);

		// // If sort has been previously set, we should sort the transformedSearch automatically
		// if (currentSort) {
		// 	transformedSearch = sort(
		// 		transformedSearch,
		// 		!ascending,
		// 		currentSort
		// 	);
		// }

		setPlayers(transformedSearch);
	};

	/**
	 * Set filters
	 * @param position IFilterValue
	 * @param team IFilterValue
	 */
	const submitFilters = (position: IFilterValue, team: IFilterValue) => {
		setFilters(
			uniqBy(
				[...filters, position, team]
					.filter((item) => item.value !== '')
					.sort((a, b) => a.category!.localeCompare(b.category!)),
				'value'
			)
		);
	};

	const handleRemoveFromFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
		const { value } = e.currentTarget;

		setFilters(filters?.filter((filter) => filter.value !== value));
	};

	// Get players
	useEffect(() => {
		if (!draftGroupId) {
			return;
		}

		(async () => {
			try {
				const response = await get(`${API}/players?id=${draftGroupId}`);
				const data = (await response.json()) as IDraftKingsResponse;

				if (data.players.length > 0) {
					setDefaultPlayers(data.players);
					setPlayers(data.players);
				} else {
					setErrorMessage('No players found');
					setIsError(true);
				}
			} catch (e) {
				console.error(
					`A problem occured when trying to retrieve API: ${e}`
				);
			}
		})();
	}, [draftGroupId]);

	// Filter players
	useEffect(() => {
		if (!filters.length || filters.length === 0) {
			setPlayers(optimizedPlayers || defaultPlayers);

			return;
		}

		setPlayers(filterPlayers(filters, optimizedPlayers || defaultPlayers));
	}, [filters]);

	return (
		<Layout>
			<Panel heading="Optimize">
				<div className="form">
					<div className="form__row row">
						<div className="form__col form__col--inline col">
							<Dropdown
								data={data}
								handleClearContestSelection={() => {
									setDraftGroupId(null);
									setIsError(false);
									setErrorMessage('');
									setPlayers(undefined);
									setDefaultPlayers(undefined);
									setOptimizedPlayers(undefined);
									setTotals(undefined);
								}}
								onContestChange={onContestChange}
							/>
						</div>
					</div>
					{isError && errorMessage ? (
						<div className="form__row row">
							<div className="form__col col">
								<p role="alert">{errorMessage}</p>
							</div>
						</div>
					) : (
						<></>
					)}
					{players ? (
						<div className="form__row row">
							<div className="form__col col">
								<div className="form__bar">
									<div>
										<Input onChange={handleSearch} />
										{/* <button
											className="form__button button button--sm-bord-rad"
											type="submit"
										>
											Bulk Actions
										</button> */}
										<Filter
											filters={filters}
											submitFilters={submitFilters}
											handleRemoveFromFilter={
												handleRemoveFromFilter
											}
										/>
									</div>
									<button
										className="form__optimize button button--light"
										type="submit"
										onClick={optimizeLineups}
									>
										Optimize
									</button>
								</div>
							</div>
						</div>
					) : (
						<></>
					)}
				</div>

				{players && (
					<Table
						players={players}
						handleSort={handleSort}
						currentSort={currentSort}
						ascending={ascending}
						totals={totals}
						// setPlayers={setPlayers}
					/>
				)}
			</Panel>
		</Layout>
	);
};

export async function getStaticProps() {
	if (!process.env.API) {
		return null;
	}

	const response = await fetch(process.env.API);
	const data = (await response.json()) as IResponse;

	return {
		props: {
			data,
		},
	};
}

export default Index;
