import { put } from 'redux-saga/effects';
import { API } from './saga';
import { ERROR_STATUSES } from '../components/error';
import {
	getPlayersSucceeded,
	getPlayersFailed,
} from '../containers/Players/Players.actions';
import { loadingTable } from '../containers/Table/Table.actions';
import { SET_ERROR } from '../containers/Error/Error.reducers';

type Action = {
	type: string;
	value: number | any;
	gameType: string;
};

export default function* fetchPlayers(action: Action) {
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

			yield put(loadingTable(true));

			const res = yield fetch(`${API}/players`, {
				method: 'POST',
				body,
			});

			const { players } = yield res.json();

			yield put(getPlayersSucceeded(players, action.gameType));
			yield put(loadingTable(false));
		} else {
			yield put(loadingTable(true));

			const res = yield fetch(`${API}/players?id=${action.value}`);
			const { players } = yield res.json();

			yield put(getPlayersSucceeded(players, action.gameType));
			yield put(loadingTable(false));
		}
	} catch (e) {
		yield put(getPlayersFailed());

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
