import { put, select } from 'redux-saga/effects';
import { ERROR_STATUSES } from '../components/error';
import { SET_ERROR } from '../containers/Error/Error.reducers';
import {
	optimizePlayersFailed,
	optimizePlayersSucceeded,
	OPTIMIZE_ACTIONS,
} from '../containers/Optimize/Optimize.actions';
import { loadingTable, setView } from '../containers/Table/Table.actions';
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
			rules,
			stacking,
			contests,
		}: RootState = yield select();

		// let tempStacking = stacking;

		if (rules.errors?.length) {
			yield put(optimizePlayersFailed());

			throw new Error("There's an error in the rules");
		}

		// if (rules.errors.length) {

		// 	// yield put({
		// 	// 	type: SET_ERROR,
		// 	// 	show: true,
		// 	// 	error: {
		// 	// 		type: ERROR_STATUSES.INTERNAL_SERVER_ERROR,
		// 	// 		message: "Can't generate lineups",
		// 	// 	},
		// 	// });

		// 	// return;
		// }

		// if (
		// 	!tempStacking.CUSTOM?.STACKS?.every(
		// 		(stack) => stack?.players?.length
		// 	)
		// ) {
		// 	tempStacking = { ...stacking, CUSTOM: undefined };
		// }

		const res = yield post(`${API}/optimize`, {
			players: {
				all: players?.all,
				locked: players?.locked?.map((player) => player.id),
				excluded: players?.excluded?.map((player) => player.id),
			},
			rules,
			sport: sports.selectedSport,
			// draftGroupId,
			stacking: {
				CUSTOM: stacking.CUSTOM,
				POSITION: stacking.POSITION,
				TEAM: stacking.TEAM,
			},
			gameType: contests.gameType,
		});

		const { lineups } = yield res.json();

		yield put(optimizePlayersSucceeded(lineups));
		yield put(setView('optimized'));
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

	yield put(loadingTable(false));
}
