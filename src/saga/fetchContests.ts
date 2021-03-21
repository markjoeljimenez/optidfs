import { put } from 'redux-saga/effects';
import { LOADING_CONTESTS, SET_CONTESTS } from '../containers/Dropdown/Dropdown.actions';
import { SET_ERROR } from '../containers/Error/Error.reducers';
import { RESET_RULES } from '../containers/Rules/Rules.actions';
import { post } from '../scripts/utilities/fetch';
import { API } from './saga';

export default function* fetchContests(action) {
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