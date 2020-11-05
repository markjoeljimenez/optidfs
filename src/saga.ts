import { put, takeLatest, all, select } from 'redux-saga/effects';

import { get, post } from './scripts/utilities/fetch';
import {
	GET_PLAYERS,
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

const API = process.env.ENDPOINT;

function* fetchContests(action) {
	try {
		if (!action.sport) {
			return;
		}

		yield put({
			type: LOADING_CONTESTS,
			message: 'Loading contests... This may take a while.',
		});

		const res = yield post(`${API}/contests`, {
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
		});

		// yield put({
		// 	type: SET_CURRENT_SPORT,
		// 	sport: action.sport,
		// });
	} catch (e) {
		yield console.log(e);
	}
}

function* fetchPlayers(action: { value: File & number }) {
	if (!action.value) {
		return;
	}

	try {
		if (action.value.type) {
			const body = new FormData();
			body.append('csv', action.value);

			yield put({ type: LOADING_PLAYERS, loading: true });

			const res = yield fetch(`${API}/players`, {
				method: 'POST',
				body,
			});

			const { players } = yield res.json();

			yield put({
				type: GET_PLAYERS_SUCCEEDED,
				// draftGroupId: action.draftGroupId,
				players,
				loading: false,
				// teamIds,
			});
		} else {
			// console.log(action);
			// yield put({ type: LOADING_PLAYERS, loading: true });
			// const res = yield get(`${API}/players?id=${action.value}`);
			// const { players, teamIds } = yield res.json();
			// yield put({
			// 	type: GET_PLAYERS_SUCCEEDED,
			// 	// draftGroupId: action.draftGroupId,
			// 	players,
			// 	loading: false,
			// 	teamIds,
			// });
		}

		// const state = yield select((_state) => _state);

		// yield put({ type: LOADING_PLAYERS, loading: true });

		// const res = yield get(`${API}/players?id=${action.draftGroupId}`);
		// const { players, teamIds } = yield res.json();

		// yield put({
		// 	type: GET_PLAYERS_SUCCEEDED,
		// 	draftGroupId: action.draftGroupId,
		// 	players,
		// 	loading: false,
		// 	teamIds,
		// 	// sport,
		// });
	} catch (e) {
		yield put({ type: GET_PLAYERS_FAILED, message: e.message });
	}
}

function* optimizePlayers(action) {
	try {
		const { sports, table, rules, header, upload } = yield select();

		if (rules.errors.length) {
			return;
		}

		const { lockedPlayers, defaultPlayers, draftGroupId } = table;

		yield put({ type: LOADING_PLAYERS, loading: true });

		// const body = new FormData();
		// body.append('csv', upload);
		// body.append('generations', rules.NUMBER_OF_GENERATIONS);
		// body.append(
		// 	'lockedPlayers',
		// 	lockedPlayers?.map((player) => player.id)
		// );
		// // body.append('players', defaultPlayers);
		// body.append('rules', rules);
		// body.append('sport', parseInt(sports.sport));
		// body.append('draftGroupId', draftGroupId);

		// const res = yield fetch(`${API}/optimize`, {
		// 	method: 'POST',
		// 	body,
		// });

		const res = yield post(`${API}/optimize`, {
			generations: action.generations,
			lockedPlayers: lockedPlayers?.map((player) => player.id),
			players: defaultPlayers,
			rules,
			sport: sports.sport,
			draftGroupId,
		});

		// const isCsv = true;
		// let res: Promise<Response>;

		// if (isCsv) {
		// 	const body = upload;

		// 	console.log(body);

		// 	// res = yield fetch(`${API}/players`, {
		// 	// 	method: 'POST',
		// 	// 	body,
		// 	// });
		// } else {
		// 	res = yield post(`${API}/optimize`, {
		// 		generations: action.generations,
		// 		lockedPlayers: lockedPlayers?.map((player) => player.id),
		// 		players: defaultPlayers,
		// 		rules: {
		// 			...rules,
		// 		},
		// 		sport: sports.sport,
		// 		draftGroupId,
		// 	});
		// }

		const { lineups } = yield res.json();

		yield put({
			type: OPTIMIZE_PLAYERS_SUCCEEDED,
			lineups,
		});
	} catch (e) {
		yield put({ type: OPTIMIZE_PLAYERS_FAILED, message: e.message });
	}
}

export default function* rootSaga() {
	yield takeLatest(FETCH_CONTESTS, fetchContests);
	yield takeLatest(GET_PLAYERS, fetchPlayers);
	yield takeLatest(OPTIMIZE_PLAYERS, optimizePlayers);
}
