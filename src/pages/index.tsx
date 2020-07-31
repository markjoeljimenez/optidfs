import React, { useState, useEffect, useRef } from 'react';
import uniqBy from 'lodash.uniqby';
import fetch from 'node-fetch';
import Fuse from 'fuse.js';

import sort from '../scripts/utilities/sort';
import { IContest, IGroup, IResponse, ILineup } from '../interfaces/IApp';
import {
	IDraftKingsResponse,
	IDraftKingsPlayer,
} from '../interfaces/IDraftKingsResponse';

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
	const numberOfOptimizations = useRef<HTMLInputElement>(null);

	const [draftGroupId, setDraftGroupId] = useState<number | null>(null);

	const [pagination, setPagination] = useState<number>(0);

	const [defaultPlayers, setDefaultPlayers] = useState<IDraftKingsPlayer[]>();
	const [optimizedLineups, setOptimizedLineups] = useState<
		IResponse['lineups']
	>();
	// const [optimizedPlayers, setOptimizedPlayers] = useState<IDraftKingsPlayer[]>();
	const [players, setPlayers] = useState<IDraftKingsPlayer[]>();
	const [totals, setTotals] = useState<ITotals>();

	const [currentSort, setCurrentSort] = useState<string | null>();
	const [ascending, setAscending] = useState(false);

	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>('');
	const [loading, setLoading] = useState<boolean>(false);

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

		const value = numberOfOptimizations.current?.value;

		if (!draftGroupId) {
			return;
		}

		if (!value) {
			setIsError(true);
			setErrorMessage('Invalid input for number of generations');

			return;
		}

		setIsError(false);
		setErrorMessage(null);
		setLoading(true);

		try {
			const response = await post(
				`${API}/${OPTIMIZE}?id=${draftGroupId}&n=${value}`
			).then((res) => {
				setLoading(false);

				return res;
			});

			const {
				lineups,
				success,
				message,
			} = (await response.json()) as IResponse;

			const transformedLineups = lineups.map((lineup) => ({
				...lineup,
				players: lineup.players.map((_player) =>
					players?.find((player) => player.id === _player)
				),
			}));

			if (success) {
				setOptimizedLineups(transformedLineups as any);
				setIsError(success);
			} else {
				setOptimizedLineups(undefined);
				setIsError(!success);
				setErrorMessage(message);
			}
		} catch (c) {
			console.error(
				`A problem occured when trying to retrieve API: ${c}`
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

		const transformedSearch = uniqBy(
			value
				? result.map((player) => player.item)
				: optimizedLineups?.[pagination].players.length
				? optimizedLineups?.[pagination].players
				: defaultPlayers
		);

		// If sort has been previously set, we should sort the transformedSearch automatically
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

	const handlePagination = (e: React.MouseEvent<HTMLButtonElement>) => {
		const { value } = e.currentTarget;

		if (pagination + parseInt(value) < 0) {
			setPagination(0);
		} else if (
			pagination + parseInt(value) >=
			optimizedLineups?.length! - 1
		) {
			setPagination(optimizedLineups?.length! - 1);
		} else {
			setPagination(pagination + parseInt(value));
		}
	};

	// Get players
	useEffect(() => {
		if (!draftGroupId) {
			return;
		}

		(async () => {
			try {
				const response = await get(`${API}/players?id=${draftGroupId}`);
				const json = (await response.json()) as IDraftKingsResponse;

				if (json.players.length > 0) {
					setDefaultPlayers(json.players);
					setPlayers(json.players);
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
			setPlayers(
				(optimizedLineups?.[pagination]
					.players as IDraftKingsPlayer[]) || defaultPlayers
			);

			return;
		}

		setPlayers(
			filterPlayers(
				filters,
				(optimizedLineups?.[pagination]
					.players as IDraftKingsPlayer[]) || defaultPlayers
			)
		);
	}, [filters]);

	// Pagination
	useEffect(() => {
		if (!optimizedLineups || pagination >= optimizedLineups.length) {
			return;
		}

		// eslint-disable-next-line no-shadow
		const { players, totalFppg, totalSalary } = optimizedLineups[
			pagination
		];

		// If there are any filters, filter players first before setting
		setPlayers(
			filters?.length !== 0
				? filterPlayers(filters, players as IDraftKingsPlayer[])
				: (players as IDraftKingsPlayer[])
		);
		setTotals({
			totalFppg,
			totalSalary,
		});
	}, [optimizedLineups, pagination]);

	return (
		<Panel heading="Optimize">
			<div className="form">
				<div className="form__row row">
					<div className="form__col form__col--inline col">
						<Dropdown
							data={data}
							handleClearContestSelection={() => {
								setDraftGroupId(null);
								setIsError(false);
								setErrorMessage(null);
								setPlayers(undefined);
								setDefaultPlayers(undefined);
								// setOptimizedPlayers(undefined);
								setOptimizedLineups(undefined);
								setTotals(undefined);
							}}
							onContestChange={onContestChange}
						/>
					</div>
				</div>
				{isError && errorMessage ? (
					<div className="form__row row">
						<div className="form__col col">
							<p role="alert" className="alert">
								{errorMessage}
							</p>
						</div>
					</div>
				) : (
					<></>
				)}
				{players ? (
					<div className="form__row row">
						<div className="form__col col">
							<div className="form__bar">
								<div className="form__left">
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
								<div className="form__right">
									<div className="input">
										<label htmlFor="numberOfGenerations">
											<span className="u-hidden">
												Number of generations
											</span>
											<input
												id="numberOfGenerations"
												type="number"
												ref={numberOfOptimizations}
												placeholder="Number of generations"
												disabled={
													optimizedLineups !==
													undefined
												}
												min={1}
												required
											/>
										</label>
									</div>
									<button
										className="form__optimize button button--light"
										type="submit"
										onClick={optimizeLineups}
										disabled={
											optimizedLineups !== undefined
										}
									>
										Optimize
									</button>
								</div>
							</div>
						</div>
					</div>
				) : (
					<></>
				)}
			</div>

			{players && (
				<Table
					ascending={ascending}
					currentSort={currentSort}
					handleSort={handleSort}
					players={players}
					totals={totals}
					lineupLength={optimizedLineups?.length}
					handlePagination={handlePagination}
					pagination={pagination + 1}
					loading={loading}
				/>
			)}
		</Panel>
	);
};

export async function getStaticProps() {
	if (!API) {
		return null;
	}

	const response = await fetch(API);
	const data = (await response.json()) as IResponse;

	return {
		props: {
			data,
		},
	};
}

export default Index;
