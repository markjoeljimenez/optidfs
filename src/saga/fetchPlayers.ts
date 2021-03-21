import { API } from './saga';
import { ERROR_STATUSES } from '../components/error';
import { LOADING_PLAYERS, GET_PLAYERS_SUCCEEDED, GET_PLAYERS_FAILED } from '../containers/Table/Table.actions';
import { put } from 'redux-saga/effects';
import { SET_ERROR } from '../containers/Error/Error.reducers';

export default function* fetchPlayers(action) {
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

			const res = yield fetch(`${API}/players?id=${action.value}`);
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
				message: 'Can\'t fetch players',
			},
		});
	}
}