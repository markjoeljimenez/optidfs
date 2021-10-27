import { call, put, takeLatest } from 'redux-saga/effects';
import { DROPDOWN_ACTIONS } from '../containers/Dropdown/Dropdown.actions';
import { OPTIMIZE_ACTIONS } from '../containers/Optimize/Optimize.actions';
import { PLAYERS_ACTIONS } from '../containers/Players/Players.actions';
import { SET_PROVIDER } from '../containers/Providers/Providers.actions';
import { SET_SPORTS } from '../containers/Sports/Sports.actions';
import providers from '../data/providers';
import { ISport } from '../interfaces/ISports';

import fetchContests from './fetchContests';
import fetchPlayers from './fetchPlayers';
import optimizePlayers from './optimizeLineups';

export const API = process.env.ENDPOINT;

const YAHOO_SPORTS: ISport[] = [
	{
		fullName: 'Basketball',
		hasPublicContests: true,
		isEnabled: true,
		regionAbbreviatedSportName: 'NBA',
		sportId: 1,
		supported: true,
	},
	{
		fullName: 'Football',
		hasPublicContests: true,
		isEnabled: true,
		regionAbbreviatedSportName: 'NFL',
		sportId: 2,
		supported: true,
	},
];

export default function* rootSaga() {
	yield takeLatest(
		SET_PROVIDER,
		function* (action: { type: string; provider: string }) {
			const response = yield fetch(`${API!}?provider=${action.provider}`);
			const allSports = yield response.json();

			yield put({
				type: SET_SPORTS,
				allSports,
			});
		}
	);

	yield takeLatest(DROPDOWN_ACTIONS.FETCH_CONTESTS, fetchContests);
	yield takeLatest(PLAYERS_ACTIONS.FETCH_PLAYERS, fetchPlayers);
	yield takeLatest(OPTIMIZE_ACTIONS.OPTIMIZE_PLAYERS, optimizePlayers);
}
