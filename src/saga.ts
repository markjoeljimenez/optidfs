import { put, takeLatest, all, select } from 'redux-saga/effects';

import { get, post } from './scripts/utilities/fetch';
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
		const { players, teamIds } = yield res.json();

		yield put({
			type: GET_PLAYERS_SUCCEEDED,
			draftGroupId: action.draftGroupId,
			players,
			loading: false,
			teamIds,
		});
	} catch (e) {
		yield put({ type: GET_PLAYERS_FAILED, message: e.message });
	}
}

function* optimizePlayers(action) {
	try {
		const { dropdown, table, rules } = yield select((_state) => _state);

		const { lockedPlayers, defaultPlayers } = table;

		yield put({ type: LOADING_PLAYERS, loading: true });

		const res = yield post(`${API}/optimize`, {
			generations: action.generations,
			lockedPlayers: lockedPlayers.map((player) => player.id),
			players: defaultPlayers,
			rules: {
				...rules,
			},
		});

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
