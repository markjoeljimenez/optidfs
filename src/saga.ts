import { put, takeLatest, all, select } from 'redux-saga/effects';
import download from 'downloadjs';

import { get, post } from './scripts/utilities/fetch';
import {
	GET_PLAYERS,
	SET_CONTESTS,
	RESET_PLAYERS,
} from './containers/Dropdown/Dropdown.actions';
import {
	GET_PLAYERS_SUCCEEDED,
	GET_PLAYERS_FAILED,
	LOADING_PLAYERS,
	DOWNLOAD_CSV,
} from './containers/Table/Table.actions';
import {
	OPTIMIZE_PLAYERS_SUCCEEDED,
	OPTIMIZE_PLAYERS_FAILED,
	OPTIMIZE_PLAYERS,
} from './containers/Optimize/Optimize.actions';
import { SET_SPORT } from './containers/Header/Header.actions';
import { RESET_RULES } from './containers/Rules/Rules.actions';

const API = process.env.ENDPOINT;

function* fetchContests(action) {
	try {
		if (!action.sport) {
			return;
		}

		const res = yield post(API!, {
			sport: action.sport,
		});

		const { contests } = yield res.json();

		yield put({
			type: RESET_PLAYERS,
		});

		yield put({
			type: RESET_RULES,
		});

		yield put({
			type: SET_CONTESTS,
			contests,
			sport: action.sport,
		});
	} catch (e) {
		yield console.log(e);
	}
}

function* fetchPlayers(action) {
	try {
		if (!action.draftGroupId) {
			return;
		}

		// const { header } = yield select((_state) => _state);

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
		const { dropdown, table, rules, header } = yield select(
			(_state) => _state
		);

		if (rules.errors.length) {
			return;
		}

		const { lockedPlayers, defaultPlayers, draftGroupId } = table;
		const { sport } = dropdown;

		yield put({ type: LOADING_PLAYERS, loading: true });

		const res = yield post(`${API}/optimize`, {
			generations: action.generations,
			lockedPlayers: lockedPlayers?.map((player) => player.id),
			players: defaultPlayers,
			rules: {
				...rules,
			},
			sport,
			draftGroupId,
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

// function* downloadCsv(action) {
// 	try {
// 		const { dropdown, table } = yield select((_state) => _state);

// 		const { defaultLineups, draftGroupId } = table;
// 		const { sport } = dropdown;

// 		return yield post(`${API}/export`, {
// 			lineups: defaultLineups,
// 			draftGroupId,
// 			sport,
// 		})
// 			.then((resp) => resp.blob())
// 			.then((blob) => download(blob, 'DKSalaries.csv', 'text/csv'));
// 	} catch (e) {
// 		// yield put({ type: OPTIMIZE_PLAYERS_FAILED, message: e.message });
// 	}

// 	return null;
// }

export default function* rootSaga() {
	yield takeLatest(SET_SPORT, fetchContests);
	yield takeLatest(GET_PLAYERS, fetchPlayers);
	yield takeLatest(OPTIMIZE_PLAYERS, optimizePlayers);
	// yield takeLatest(DOWNLOAD_CSV, downloadCsv);
}
