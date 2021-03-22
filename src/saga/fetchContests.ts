import { put } from 'redux-saga/effects';
import { DROPDOWN_ACTIONS } from '../containers/Dropdown/Dropdown.actions';
import { SET_ERROR } from '../containers/Error/Error.reducers';
import { RESET_RULES } from '../containers/Rules/Rules.actions';
import { UPDATE_SPORT } from '../containers/Sports/Sports.actions';
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
			type: DROPDOWN_ACTIONS.LOADING_CONTESTS,
		});

		yield put({
			type: UPDATE_SPORT,
			selectedSport: action.sport,
		});

		const res = yield post(`${API}/contests`, {
			sport: action.sport,
		});

		const { contests } = yield res.json();

		yield put({
			type: RESET_RULES,
		});

		yield put({
			type: DROPDOWN_ACTIONS.SET_CONTESTS,
			contests,
		});
	} catch (e) {
		yield console.log(e);
	}
}
