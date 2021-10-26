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
	try {
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

		const res = yield post(`${API}/contests`, {
			sportId: action.sport.sportId,
			sport: action.sport.regionAbbreviatedSportName,
			provider: providers.provider,
		});

		const { contests } = yield res.json();

		yield put(setContests(contests, providers.provider!));
		yield put(resetError());
	} catch (e) {
		yield put(setInternalServerError(e));
	}
}
