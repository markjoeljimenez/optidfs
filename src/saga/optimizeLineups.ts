import { put, select } from 'redux-saga/effects';
import { post } from '../scripts/utilities/fetch';
import { RootState } from '../store';
import { API } from './saga';

import { resetError, setInternalServerError } from '../containers/Error/Error.actions';
import {
	optimizePlayersSucceeded,
} from '../containers/Optimize/Optimize.actions';
import { loadingTable, setView } from '../containers/Table/Table.actions';

export default function* optimizePlayers() {
	try {
		yield put(loadingTable(true));

		const {
			players,
			sports,
			rules,
			stacking,
			contests,
		}: RootState = yield select();

		if (rules.errors) {
			throw new Error("There's an error in the rules");
		}

		const tempStacking = {
			CUSTOM: stacking.CUSTOM?.STACKS?.some((stack) => stack?.players?.length > 0) ? stacking.CUSTOM : undefined,
			POSITION: stacking.POSITION,
			TEAM: stacking.TEAM,
		};

		const res = yield post(`${API}/optimize`, {
			players: {
				all: players?.all,
				locked: players?.locked?.map((player) => player.id),
				excluded: players?.excluded?.map((player) => player.id),
			},
			rules,
			sport: sports.selectedSport,
			// draftGroupId,
			stacking: !Object.values(tempStacking).every((s) => s === undefined) ? tempStacking : undefined,
			gameType: contests.gameType,
		});

		const { lineups } = yield res.json();

		yield put(optimizePlayersSucceeded(lineups));
		yield put(setView('optimized'));
		yield put(resetError());
	} catch (e) {
		yield put(setInternalServerError(e));
	} finally {
		yield put(loadingTable(false));
	}
}
