import { takeLatest } from 'redux-saga/effects';
import { DROPDOWN_ACTIONS } from '../containers/Dropdown/Dropdown.actions';
import { OPTIMIZE_ACTIONS } from '../containers/Optimize/Optimize.actions';
import { PLAYERS_ACTIONS } from '../containers/Players/Players.actions';

import fetchContests from './fetchContests';
import fetchPlayers from './fetchPlayers';
import optimizePlayers from './optimizeLineups';

export const API = process.env.ENDPOINT;

export default function* rootSaga() {
	yield takeLatest(PLAYERS_ACTIONS.FETCH_PLAYERS, fetchPlayers);
	yield takeLatest(DROPDOWN_ACTIONS.FETCH_CONTESTS, fetchContests);
	yield takeLatest(OPTIMIZE_ACTIONS.OPTIMIZE_PLAYERS, optimizePlayers);
}
