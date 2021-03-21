
import { all, takeLatest } from 'redux-saga/effects';

import { FETCH_PLAYERS, FETCH_CONTESTS } from '../containers/Dropdown/Dropdown.actions';
import { OPTIMIZE_PLAYERS } from '../containers/Optimize/Optimize.actions';
import fetchContests from './fetchContests';
import fetchPlayers from './fetchPlayers';
import optimizePlayers from './optimizeLineups';

export const API = process.env.ENDPOINT;

export default function* rootSaga() {
	yield all([
		takeLatest(FETCH_PLAYERS, fetchPlayers),
		takeLatest(FETCH_CONTESTS, fetchContests),
		takeLatest(OPTIMIZE_PLAYERS, optimizePlayers)
	])
}
