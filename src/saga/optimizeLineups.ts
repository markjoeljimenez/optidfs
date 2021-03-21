import { put, select } from 'redux-saga/effects';
import { ERROR_STATUSES } from '../components/error';
import { SET_ERROR } from '../containers/Error/Error.reducers';
import {
	optimizePlayersSucceeded,
	OPTIMIZE_ACTIONS,
} from '../containers/Optimize/Optimize.actions';
import { loadingTable } from '../containers/Table/Table.actions';
import { post } from '../scripts/utilities/fetch';
import { RootState } from '../store';
import { API } from './saga';

export default function* optimizePlayers() {
	yield put({
		type: SET_ERROR,
		error: null,
	});

	yield put(loadingTable(true));

	try {
		const {
			players,
			sports,
			table,
			rules,
			stacking,
		}: RootState = yield select();

		let tempStacking = stacking;

		// if (rules.errors) {
		// 	yield put({
		// 		type: OPTIMIZE_PLAYERS_FAILED,
		// 	});

		// 	yield put({
		// 		type: SET_ERROR,
		// 		show: true,
		// 		error: {
		// 			type: ERROR_STATUSES.INTERNAL_SERVER_ERROR,
		// 			message: "Can't generate lineups",
		// 		},
		// 	});

		// 	return;
		// }

		// if (
		// 	!tempStacking.CUSTOM?.STACKS?.every(
		// 		(stack) => stack?.players?.length
		// 	)
		// ) {
		// 	tempStacking = { ...stacking, CUSTOM: undefined };
		// }

		const res = yield post(`${API}/optimize`, {
			// lockedPlayers: lockedPlayers?.map((player) => player.id),
			// excludedPlayers: excludedPlayers?.map((player) => player.id),
			players,
			// players: {
			// 	all: players?.all,
			// 	locked: players?.locked?.map((player) => player.id),
			// 	excluded: players?.excluded?.map((player) => player.id),
			// },
			rules,
			sport: sports.selectedSport,
			// draftGroupId,
			stacking: tempStacking,
			// gameType,
		});

		const { lineups } = yield res.json();

		yield put(optimizePlayersSucceeded(lineups));
		yield put(loadingTable(false));
	} catch (e) {
		yield put({
			type: OPTIMIZE_ACTIONS.OPTIMIZE_PLAYERS_FAILED,
		});

		yield put({
			type: SET_ERROR,
			error: {
				type: ERROR_STATUSES.INTERNAL_SERVER_ERROR,
				show: true,
				message: "Can't generate lineups",
			},
		});
	}
}
