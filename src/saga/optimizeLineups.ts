import { put, select } from 'redux-saga/effects';

import {
	resetError,
	setInternalServerError,
} from '../containers/Error/Error.actions';
import { optimizePlayersSucceeded } from '../containers/Optimize/Optimize.actions';
import { loadingTable, setView } from '../containers/Table/Table.actions';
import { post } from '../scripts/utilities/fetch';
import { RootState } from '../store';
import { API } from './saga';

export default function* optimizePlayers() {
	try {
		yield put(loadingTable(true));

		const {
			players,
			rules,
			sports,
			contests,
			stacking,
			providers,
		}: RootState = yield select();

		if (rules.errors) {
			throw new Error("There's an error in the rules");
		}

		const body = {
			players: {
				all: players?.all,
				locked: players?.locked?.map((player) => player.id),
				excluded: players?.excluded?.map((player) => player.id),
			},
			rules,
			sport: sports.selectedSport,
			// draftGroupId,
			stacking:
				stacking.CUSTOM?.STACKS[0].players.length ||
				stacking.POSITION ||
				stacking.TEAM
					? {
							CUSTOM: stacking.CUSTOM,
							POSITION: stacking.POSITION,
							TEAM: stacking.TEAM,
					  }
					: undefined,
			gameType: contests.gameType,
			provider: providers.provider,
		};

		const res = yield post(`${API}/optimize`, body);
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
