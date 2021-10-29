import { put, select } from 'redux-saga/effects';
import { API } from './saga';
import { post } from '../scripts/utilities/fetch';

import {
	DROPDOWN_ACTIONS,
	setContests,
} from '../containers/Dropdown/Dropdown.actions';
import {
	resetError,
	setInternalServerError,
} from '../containers/Error/Error.actions';
import { UPDATE_SPORT } from '../containers/Sports/Sports.actions';
import { RootState } from '../store';

export default function* fetchContests(action) {
	if (!action.sport) {
		throw new Error('Invalid sport selected');
	}

	const { providers }: RootState = yield select();

	yield put({
		type: DROPDOWN_ACTIONS.LOADING_CONTESTS,
	});

	yield put({
		type: UPDATE_SPORT,
		selectedSport: action.sport,
	});

	const { contests, e } = yield post(`${API}/contests`, {
		sportId: action.sport.sportId,
		sport: action.sport.regionAbbreviatedSportName,
		provider: providers.provider,
	})
		.then((res) => res.json())
		.catch((e) => {
			console.log(e);
			return e;
		});
	// const { contests } = res.json();

	// yield put(resetError());
	if (contests) {
		yield put(setContests(contests, providers.provider!));
	} else {
		console.log(e);
	}
	// try {
	// } catch (e) {
	// 	console.log(e);
	// 	yield put(setInternalServerError(e));
	// }
}
