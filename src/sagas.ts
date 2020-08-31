import { put, takeLatest } from 'redux-saga/effects';
import { get } from './scripts/utilities/fetch';

const API = process.env.ENDPOINT;

function* fetchPlayers(action) {
	try {
		const res = yield get(`${API}/players?id=${action.payload}`);
		const { players } = yield res.json();

		yield put({ type: 'GET_PLAYERS_SUCCEEDED', payload: players });
	} catch (e) {
		yield put({ type: 'GET_PLAYERS_FAILED', message: e.message });
	}
}

export default function* rootSaga() {
	yield takeLatest('GET_PLAYERS', fetchPlayers);
}
