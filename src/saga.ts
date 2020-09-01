import { put, takeLatest, all, select } from 'redux-saga/effects';

import { get } from './scripts/utilities/fetch';
import { GET_PLAYERS } from './containers/Dropdown/Dropdown.actions';
import {
	GET_PLAYERS_SUCCEEDED,
	GET_PLAYERS_FAILED,
	LOADING_PLAYERS,
} from './containers/Table/Table.actions';
import {
	OPTIMIZE_PLAYERS_SUCCEEDED,
	OPTIMIZE_PLAYERS_FAILED,
	OPTIMIZE_PLAYERS,
} from './containers/Optimize/Optimize.actions';

const API = process.env.ENDPOINT;

function* fetchPlayers(action) {
	try {
		if (!action.draftGroupId) {
			return;
		}

		yield put({ type: LOADING_PLAYERS, loading: true });

		const res = yield get(`${API}/players?id=${action.draftGroupId}`);
		const { players } = yield res.json();

		yield put({
			type: GET_PLAYERS_SUCCEEDED,
			draftGroupId: action.draftGroupId,
			players,
			loading: false,
		});
	} catch (e) {
		yield put({ type: GET_PLAYERS_FAILED, message: e.message });
	}
}

function* optimizePlayers(action) {
	try {
		const state = yield select((_state) => _state);

		if (!action.draftGroupId || state.table.lineups) {
			return;
		}

		yield put({ type: LOADING_PLAYERS, loading: true });

		const res = yield get(
			`${API}/optimize?id=${action.draftGroupId}&n=${action.generations}`
		);
		const { lineups } = yield res.json();

		yield put({
			type: OPTIMIZE_PLAYERS_SUCCEEDED,
			lineups,
			loading: false,
		});
	} catch (e) {
		yield put({ type: OPTIMIZE_PLAYERS_FAILED, message: e.message });
	}
}

export default function* rootSaga() {
	yield takeLatest(GET_PLAYERS, fetchPlayers);
	yield takeLatest(OPTIMIZE_PLAYERS, optimizePlayers);
}
