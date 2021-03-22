import { put } from 'redux-saga/effects';
import { API } from './saga';

import {
	getPlayersSucceeded,
} from '../containers/Players/Players.actions';
import { loadingTable } from '../containers/Table/Table.actions';
import { resetError, setInternalServerError } from '../containers/Error/Error.actions';

type Action = {
	type: string;
	value: number | any;
	gameType: string;
};

export default function* fetchPlayers(action: Action) {
	try {
		if (!action.value) {
			throw new Error('Missing draft ID');
		}

		yield put(loadingTable(true));

		// Check input type is CSV
		if (action.value.type) {
			const body = new FormData();
			body.append('csv', action.value);

			const res = yield fetch(`${API}/players`, {
				method: 'POST',
				body,
			});

			const { players } = yield res.json();

			yield put(getPlayersSucceeded(players));
		} else {
			const res = yield fetch(`${API}/players?id=${action.value}`);
			const { players } = yield res.json();

			yield put(getPlayersSucceeded(players));
		}

		// Clear error
		yield put(resetError());
	} catch (e) {
		yield put(setInternalServerError(e));
	} finally {
		yield put(loadingTable(false));
	}
}
