import { put, select } from 'redux-saga/effects';

import {
	resetError,
	setInternalServerError,
} from '../containers/Error/Error.actions';
import { getPlayersSucceeded } from '../containers/Players/redux/Players.actions';
import { loadingTable } from '../containers/Table/Table.actions';
import { RootState } from '../store';
import { API } from './saga';

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

		const { providers, contests }: RootState = yield select();

		yield put(loadingTable(true));

		// Check input type is CSV
		if (action.value.type) {
			const body = new FormData();
			body.append('csv', action.value);

			const res = yield fetch(`${API}/players`, {
				method: 'POST',
				body,
			});

			const { players, provider } = yield res.json();

			yield put(getPlayersSucceeded(players, provider));
		} else {
			const res = yield fetch(
				`${API}/players?provider=${providers.provider}&id=${action.value}&gameType="${contests.gameType}"`
			);
			const { players, provider } = yield res.json();

			yield put(getPlayersSucceeded(players, provider));
		}

		// Clear error
		yield put(resetError());
	} catch (e) {
		yield put(setInternalServerError(e));
	} finally {
		yield put(loadingTable(false));
	}
}
