import { put, takeLatest, all, select } from 'redux-saga/effects';

import { get, post } from './scripts/utilities/fetch';
import {
	FETCH_PLAYERS,
	RESET_PLAYERS,
	FETCH_CONTESTS,
	SET_CONTESTS,
	LOADING_CONTESTS,
} from './containers/Dropdown/Dropdown.actions';
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
import { RESET_RULES } from './containers/Rules/Rules.actions';
import { SET_ERROR } from './containers/Error/Error.reducers';
import { ERROR_STATUSES } from './components/error';

const API = process.env.ENDPOINT;

function* fetchContests(action) {
	yield put({
		type: SET_ERROR,
		error: null,
	});

	if (!action.sport) {
		return;
	}

	try {
		yield put({
			type: LOADING_CONTESTS,
		});

		const res = yield post(`${API}/contests`, {
			sport: action.sport,
		});

		const { contests } = yield res.json();

		yield put({
			type: RESET_RULES,
		});

		yield put({
			type: SET_CONTESTS,
			contests,
		});
	} catch (e) {
		yield console.log(e);
	}
}

/**
 * Users have the ability to either upload a CSV or select a contest from DraftKing's API
 * @param action
 */
function* fetchPlayers(action) {
	yield put({
		type: SET_ERROR,
		error: null,
	});

	if (!action.value) {
		return;
	}

	try {
		// Check input type is CSV
		if (action.value.type) {
			const body = new FormData();
			body.append('csv', action.value);

			yield put({ type: LOADING_PLAYERS });

			const res = yield fetch(`${API}/players`, {
				method: 'POST',
				body,
			});

			const { players } = yield res.json();

			yield put({
				type: GET_PLAYERS_SUCCEEDED,
				players,
				gameType: action.gameType,
			});
		} else {
			yield put({ type: LOADING_PLAYERS });

			const res = yield get(`${API}/players?id=${action.value}`);
			const { players } = yield res.json();

			yield put({
				type: GET_PLAYERS_SUCCEEDED,
				players,
				gameType: action.gameType,
			});
		}
	} catch (e) {
		yield put({ type: GET_PLAYERS_FAILED });

		yield put({
			type: SET_ERROR,
			error: {
				type: ERROR_STATUSES.INTERNAL_SERVER_ERROR,
				show: true,
				message: "Can't fetch players",
			},
		});
	}
}

function* optimizePlayers() {
	yield put({
		type: SET_ERROR,
		error: null,
	});

	yield put({ type: LOADING_PLAYERS });

	try {
		const { sports, table, rules, stacking } = yield select();

		if (rules.errors.length) {
			yield put({
				type: OPTIMIZE_PLAYERS_FAILED,
			});

			yield put({
				type: SET_ERROR,
				show: true,
				error: {
					type: ERROR_STATUSES.INTERNAL_SERVER_ERROR,
					message: "Can't generate lineups",
				},
			});

			return;
		}

		const { lockedPlayers, defaultPlayers, draftGroupId, gameType } = table;

		const res = yield post(`${API}/optimize`, {
			lockedPlayers: lockedPlayers?.map((player) => player.id),
			players: defaultPlayers,
			rules,
			sport: sports.sport,
			draftGroupId,
			stacking,
			gameType,
		});

		const { lineups } = yield res.json();

		yield put({
			type: OPTIMIZE_PLAYERS_SUCCEEDED,
			lineups,
		});
	} catch (e) {
		yield put({
			type: OPTIMIZE_PLAYERS_FAILED,
		});

		yield put({
			type: SET_ERROR,
			error: {
				type: ERROR_STATUSES.INTERNAL_SERVER_ERROR,
				show: true,
				message: "Can't generate lineups",
			},
		});
	}
}

export default function* rootSaga() {
	yield takeLatest(FETCH_PLAYERS, fetchPlayers);
	yield takeLatest(FETCH_CONTESTS, fetchContests);
	yield takeLatest(OPTIMIZE_PLAYERS, optimizePlayers);
}
