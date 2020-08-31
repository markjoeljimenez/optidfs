import { put, takeLatest } from 'redux-saga/effects';

import { get } from './scripts/utilities/fetch';
import { GET_PLAYERS } from './containers/Dropdown/Dropdown.actions';
import {
	GET_PLAYERS_SUCCEEDED,
	GET_PLAYERS_FAILED,
	LOADING_PLAYERS,
} from './containers/Table/Table.actions';

const API = process.env.ENDPOINT;

function* fetchPlayers(action) {
	try {
		if (!action.payload) {
			return;
		}

		yield put({ type: LOADING_PLAYERS, loading: true });

		const res = yield get(`${API}/players?id=${action.payload}`);
		const { players } = yield res.json();

		yield put({
			type: GET_PLAYERS_SUCCEEDED,
			payload: players,
			loading: false,
		});
	} catch (e) {
		yield put({ type: GET_PLAYERS_FAILED, message: e.message });
	}
}

export default function* rootSaga() {
	yield takeLatest(GET_PLAYERS, fetchPlayers);
}
